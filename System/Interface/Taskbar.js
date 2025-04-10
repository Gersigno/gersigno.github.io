import ZindexMap from '/System/Utils/ZindexMap.js';
import ColorToStylesheet from '/System/Utils/ColorToStylesheet.js';
import ColorSolver from '/System/Utils/ColorSolver.js';
import System from '/System/Core/System.js';
import Window from '/System/Interface/HTML/Window.js'

export default class Taskbar {
    #elements = {};

    constructor() {
        this.#build();
        this.#buildActionsPart();
        this.#buildCurrentTimeDate();
        this.#updateDateTime();

        document.addEventListener(System.events.theme_loaded, () => {
            this.#applyColorShem();
        })

        document.addEventListener(System.events.process_started, () => {
            this.#updateAppsList();
        })
        document.addEventListener(System.events.process_killed, () => {
            this.#updateAppsList();
        })
        document.addEventListener(System.events.focus_changed, () => {
            this.#updateAppsList();

            const startmenu = document.querySelector("start-menu");
            if(startmenu != null) {
                startmenu.remove();
            }
        })
    }

    listUpdated() {

    }

    #build() {
        this.#elements.taskbar                  = document.createElement("footer");
        this.#elements.taskbar.id               = "taskbar";
        this.#elements.taskbar.style.zIndex     = ZindexMap.map.taskbar;

        this.#elements.super                    = document.createElement("button");
        this.#elements.super.id                 = "super";

        this.#elements.applist                  = document.createElement("section");
        this.#elements.applist.id               = "taskbar_applist";

        this.#elements.actions                  = document.createElement("section");
        this.#elements.actions.id               = "taskbar_actions";

        this.#elements.super_icon               = document.createElement("img");
        this.#elements.super_icon.src           = "/Themes/" + system.services.settings.current.theme_name + "/Icons/super.png";

        this.#elements.super.appendChild(this.#elements.super_icon)
        this.#elements.taskbar.appendChild(this.#elements.super);
        this.#elements.taskbar.appendChild(this.#elements.applist);
        this.#elements.taskbar.appendChild(this.#elements.actions);
        document.body.appendChild(this.#elements.taskbar);

        this.#elements.super.addEventListener("click", () => {
            this.#openStartMenu();
        });
    }

    #buildActionsPart() {
        const volume_btn = document.createElement("button");
        const volume_icon = document.createElement("img");

        volume_btn.id = "volume_btn";
        volume_icon.src = "/Themes/" + system.services.settings.current.theme_name + "/Icons/volume.png";

        volume_btn.appendChild(volume_icon);
        this.#elements.actions.appendChild(volume_btn);
    }

    #buildCurrentTimeDate() {
        const section = document.createElement("section");
        this.#elements.time = document.createElement("span");
        this.#elements.date = document.createElement("span");
        
        section.id = "current_time_date";
        this.#elements.time.id = "current_time";
        this.#elements.date.id = "current_date";

        const datetime = new Date();
        const date = datetime.toLocaleDateString();
        const time = datetime.toLocaleTimeString();
        
        this.#elements.time.innerText = time;
        this.#elements.date.innerText = date;

        section.appendChild(this.#elements.time);
        section.appendChild(this.#elements.date);
        this.#elements.actions.appendChild(section);
    }

    #updateDateTime() {
        setTimeout(() => {
            const datetime = new Date();
            const date = datetime.toLocaleDateString();
            const time = datetime.toLocaleTimeString();
            
            this.#elements.time.innerText = time;
            this.#elements.date.innerText = date;

            this.#updateDateTime();
        }, 1000);
    }

    get element() {
        return this.#elements.taskbar;
    }

    #openStartMenu() {
        let start_menu = document.querySelector("start-menu");

        if(start_menu != null) {
            start_menu.remove();
            return;
        } else {
            start_menu = document.createElement("start-menu");

            document.body.appendChild(start_menu);
        }
    }

    #applyColorShem() {
        const color_filter  = new ColorToStylesheet();
        const super_key     = document.getElementById("super");

        const rgb = color_filter.hexToRgb(window.getComputedStyle(document.documentElement).getPropertyValue('--color-primary').toString());
        const color = new ColorToStylesheet(rgb[0], rgb[1], rgb[2]);
        const solver = new ColorSolver(color);
        const result = solver.solve();
        document.documentElement.style.setProperty("--var-taskbar-icon-hover-color", "\"" + result.filter + "\"");
        super_key.style.cssText = `filter:${result.filter}`;
    }

    #updateAppsList() {
        this.#elements.applist.innerHTML = ``;
        Window.instances.forEach(instance => {
            const button = document.createElement("button");
            const icon = document.createElement("img");

            if(instance.classList.contains("focused")) {
                button.classList.add("focused");
            }

            button.addEventListener("click", () => {
                instance.style.display = "flex";
                instance.bringToFront();
            });
            
            icon.id = instance.id + "_taskbar_shortcut";
            icon.src = document.getElementById(instance.id + "_icon").src
            button.appendChild(icon);
            this.#elements.applist.appendChild(button)
        });
        this.listUpdated();
    }
}