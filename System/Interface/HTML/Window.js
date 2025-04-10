import ZindexMap from "/System/Utils/ZindexMap.js";
import System from "/System/Core/System.js";
import Vec2d_t from "/System/Utils/Vec2d_t.js";

export default class Window extends HTMLElement {
    static instances = []; //Will store every opened windows
    static focus_order = []; //Used to store our focus order (z-index)

    static observedAttributes = [
                        //! = required
                        //* = not required
                        //$ = Not implemented yet/Todo

        "title",        //! {String} Application displayed title
        "application",  //! {String} Application key name
        "no_header",    //* {Boolean} Should we hide the header of the window (action buttons will stay anyway)
        "size",         //$* {Vec2d_t} Apply a custom window size (default if no attibute set)
        "minsize",      //$* {Vec2d_t} Minimum window size 
        "maxsize",      //$* {Vec2d_t} Maximum window size 
        "position",     //$* {Vec2d_t} Apply a custom window size (default if no attibute set)
        "resizable",    //$* {Boolean} Is current window resizable
        "minimizable",  //$* {Boolean} Is current window minimizable button visible
        "maximizable",  //$* {Boolean} Is current window maximize button visible
    ];

    #UWID = Date.now().toString(36) + Math.random().toString(36).substr(2);
    #NEW_WINDOW_GAP = 20; //Gap between each new window
    #BASE_SIZE = {
        w: (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 2),
        h: (Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) / 2)
    };
    #exists = false;
    #is_moving = false;
    #move_base_mouse_pos;
    #move_base_window_pos;

    async #build() {
        // console.log("Building window...");
        const title             = this.getAttribute("display_name");
        const window_content    = `
        <header>
            <section>
                <img id="${this.#UWID}_icon">
                <h2  id="${this.#UWID}_title" >${title}</h2>
            </section>
            <section>
                <button id="${this.#UWID}_minimize">—</button>
                <button id="${this.#UWID}_maximize" ${!system.core.responsive.isDesktop() ? `class="hidden"` : ``}>▭</button>
                <button id="${this.#UWID}_closebtn">✕</button>
            </section>
        </header>
        <iframe id="${this.#UWID}_frame"></iframe>`;
        const default_position  = 25; //Default window's position in user viewport (in viewport x/y percentage)
        const viewport = {
            w: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
            h: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        };
        const size = this.#BASE_SIZE;
        const position = {
            x: ((viewport.w * default_position) / 100),
            y: ((viewport.h * default_position) / 100)
        };

        this.innerHTML = window_content;
        this.id = this.#UWID;
        this.style.width       = size.w + "px";
        this.style.height      = size.h + "px";
        this.style.left        = position.x + ((Window.instances.length - 1) * this.#NEW_WINDOW_GAP) + "px";
        this.style.top         = position.y + ((Window.instances.length - 1) * this.#NEW_WINDOW_GAP) + "px";

        if(!system.core.responsive.isDesktop()) {
            this.classList.add("maximized");
        }

        this.#updateHeader();
        await this.#updateIcon();
        await this.#updateIframe();

        document.dispatchEvent(System.events.process_started); //Dispatch our custom event

        this.#exists = true;
    }

    #initEvent() {
        const action_minimize = document.getElementById(this.#UWID + "_minimize");
        const action_maximize = document.getElementById(this.#UWID + "_maximize");
        const action_close = document.getElementById(this.#UWID + "_closebtn");
        const header = document.querySelector(`#${this.#UWID}>header:first-child`);

        action_minimize.addEventListener("click", (event) => {
            this.minimize();
        });

        action_close.addEventListener("click", (event) => {
            this.close();
        });

        action_maximize.addEventListener("click", (event) => {
            if(system.core.responsive.isDesktop()) {
                this.maximize();
            }
        });

        this.addEventListener("click", (event) => {
            this.bringToFront();
        });

        document.addEventListener("theme_loaded", () => {
            this.#updatePageStyle();
        })

        header.addEventListener("mousedown", (event) => {
            if(event.srcElement != action_close && system.core.responsive.isDesktop()) {
                event.preventDefault();
                this.bringToFront();
                this.#moveBegin();
            }
        });
        header.addEventListener("mouseup", () => {
            this.#moveStop();
        });
        header.addEventListener("focusout", () => {
            this.#moveStop();
        });
    }

    #updateZindex() {
        const zindex_min = ZindexMap.map.window.start;
        const zindex_max = ZindexMap.map.window.end;
        let zindex = zindex_min;

        Window.focus_order.forEach(application => {
            if(zindex < zindex_max) {
                application.style.zIndex = zindex;
            }
            zindex++;
        });
    }

    #injectStyles() {
        const css_files = document.querySelectorAll("link");
        const frame = document.getElementById(this.#UWID + "_frame");
        const head = frame.contentDocument.querySelector("head");

        css_files.forEach(link => {
            // console.log(link.title, link.title != '')
            if(link.rel = "stylesheet") {
                const new_link = document.createElement("link");
                new_link.rel = "stylesheet";
                new_link.href = link.href;
                if(link.title != '') {
                    new_link.setAttribute("title", link.title);
                }
                head.appendChild(new_link);
            }
        });

        const GwinUilib = document.createElement("script");
        GwinUilib.type = "module";
        GwinUilib.src = window.location.href + "System/Interface/GwinUilib/include.js";
        head.appendChild(GwinUilib);
    }

    #updatePageStyle() {
        const css_files = document.querySelector("link[title='current_theme']");
        const frame = document.getElementById(this.#UWID + "_frame");
        
        const head = frame.contentDocument.querySelector("head");
        const linktag = head.querySelector("link[title='current_theme']");
        linktag.href = css_files.href;
    }

    /**
     * Trigger our window movements begin
     */
    #moveBegin() {
        if(!this.classList.contains("maximized")) {
            const frame = document.getElementById(this.#UWID + "_frame");

            this.#move_base_mouse_pos = {
                x: system.core.controls.mouse_position.x, 
                y: system.core.controls.mouse_position.y 
            }; //Rebuilding the value object to avoid reference
            
            this.#move_base_window_pos = {
                x: parseInt(this.style.left.replace("px", "")), 
                y: parseInt(this.style.top.replace("px", ""))
            };
            this.#is_moving = true;
            frame.style.pointerEvents = 'none';
            requestAnimationFrame(() => this.#move());
        }
    }

    /**
     * Stop our moving window animation
     */
    #moveStop() {
        const frame = document.getElementById(this.#UWID + "_frame");

        this.#is_moving = false;
        frame.style.pointerEvents = 'inherit';
    }

    /**
     * Move our current window to our user's positions (with offsets)
     */
    #move() {
        const window_position = {
            x: system.core.controls.mouse_position.x - (this.#move_base_mouse_pos.x - this.#move_base_window_pos.x),
            y: system.core.controls.mouse_position.y - (this.#move_base_mouse_pos.y - this.#move_base_window_pos.y)
        };
        this.style.left = window_position.x + "px";
        this.style.top  = window_position.y + "px";

        if(this.#is_moving) {
            requestAnimationFrame(() => this.#move());
        }
    }

    async #updateIframe() {
        const frame = document.getElementById(this.#UWID + "_frame");
        const path = `/Applications/${this.getAttribute("application")}/index.html`;

        frame.src = path;
        frame.style.opacity = '0';
        const page_html = frame.contentDocument.querySelector("html");
        const body = page_html.querySelector("body");
        
        frame.addEventListener("load", () => {
            body.style.opacity = '0';
            this.#injectStyles();
            frame.contentWindow.document.addEventListener('DOMContentLoaded', this.#onFrameDOMContentLoaded(), true);
            frame.contentWindow.document.addEventListener('click', (event) => {
                this.bringToFront();
            });
        });
    }

    #onFrameDOMContentLoaded () {
        const window = document.getElementById(this.#UWID);
        const frame = document.getElementById(this.#UWID + "_frame");
        window.style.backgroundImage = "none";
        frame.style = undefined;
    };

    async #updateIcon() {
        const icon = document.getElementById(this.#UWID + "_icon");
        const path = `/Themes/${system.services.settings.current.theme_name}/Icons/Applications/${this.getAttribute("application")}.png`;
        
        icon.src = path;

        //Set application icon at the middle of our application until we successfully load it's content
        const frame = document.getElementById(this.#UWID);
        const iconsrc = document.getElementById(this.#UWID + "_icon").src;
        frame.style.backgroundImage =  `url("${iconsrc}")`;
        frame.style.backgroundRepeat = "no-repeat";
        frame.style.backgroundPosition = "center";
        frame.style.backgroundSize = "96px";
    }

    #updateHeader() {
        const should_hide = Boolean(this.getAttribute("no_header")) || false;
        const header = this.querySelector("header");
        header.classList.toggle("header_hidden", should_hide);
    }

    async #update() {
        if(this.#exists) {
            this.#updateIcon();
            this.#updateHeader();
        }
    }

    bringToFront() {
        let new_array = [];
        let focus_app;

        Window.focus_order.forEach(application => {
            if(application.id != this.#UWID) {
                new_array.push(application);
                application.classList.remove("focused");
            } else {
                focus_app = application;
                application.classList.add("focused");
            }
        });
        if(focus_app != undefined) {
            new_array.push(focus_app);
        }
        Window.focus_order = new_array;
        
        this.#updateZindex();
        document.dispatchEvent(System.events.focus_changed); //Dispatch our custom event
    }

    minimize() {
        this.style.display = "none";
    }

    maximize() {
        this.classList.toggle("maximized");
    }

    close() {
        this.remove();
    }

    connectedCallback() {
        Window.instances.push(this); //Push current window to our opened windows array
        Window.focus_order.push(this); //Push current window to our focus order array
        this.#build();
        this.#initEvent();
        this.bringToFront();

        this.#update();
    }

    disconnectedCallback() {
        const current_index = Window.instances.indexOf(this); //get index of the current window in our static instances array
        if (current_index > -1) { // only splice array when item is found
            Window.instances.splice(current_index, 1); // remove current window from instances static array
        }
        const current_order_index = Window.focus_order.indexOf(this); //get index of the current window in our static focus_order array
        if (current_order_index > -1) { // only splice array when item is found
            Window.focus_order.splice(current_order_index, 1); // remove current window from focus_order static array
        }
        document.dispatchEvent(System.events.process_killed);  //Dispatch our custom event
    }

    attributeChangedCallback() {
        this.#update();
    }
}