import System from "/System/Core/System.js";

export default class NavView extends HTMLElement {
    static observedAttributes = ["page_id"];

    current_page_id = undefined;

    #native_button = {
        collapse: document.createElement("nav-view-button"),
        settings: document.createElement("nav-view-button"),
    };
    #title = document.createElement("h2");
    #menu = document.createElement("menu");
    #content = document.createElement("section");
    #button = class Button extends HTMLElement {
        constructor() {
            super();
        }
    }
    #page = class Page extends HTMLElement {
        constructor() {
            super();
        }
    }

    constructor() {
        super();

        window.customElements.define("nav-view-button", this.#button);
        window.customElements.define("nav-view-page", this.#page);

        
    }
     
    #build() {
        const main                      = document.createElement("main");
        const collapse_icon             = document.createElement("button-icon");
        const settings_icon             = document.createElement("button-icon");
        const settings_button_text      = document.createElement("p");

        this.#native_button.collapse.classList.add("collapse-btn");
        this.#native_button.settings.classList.add("settings-btn");

        collapse_icon.setAttribute("icon", "burger");
        collapse_icon.setAttribute("size", "small");

        settings_icon.setAttribute("icon", "settings");
        settings_icon.setAttribute("size", "small");

        settings_button_text.innerText = "Settings";

        this.#native_button.collapse.appendChild(collapse_icon);

        this.#native_button.settings.appendChild(settings_icon);
        this.#native_button.settings.appendChild(settings_button_text);

        this.#title.innerText = "Title";
        this.#title.classList.add("page-title");

        this.#native_button.collapse.onclick = () => {
            this.toggleCollapse();
        }

        this.#native_button.settings.onclick = () => {
            window.top.system.services.toast.newToast(`/Themes/${window.top.system.services.settings.current.theme_name}/Icons/warning.png`, "Error", "This page is not done yet !");
        }

        main.appendChild(this.#title);
        main.appendChild(this.#content);

        this.#menu.prepend(this.#native_button.collapse);
        this.#menu.appendChild(this.#native_button.settings);
        
        this.appendChild(this.#menu);
        this.appendChild(main);

        this.switchPage(this.current_page_id);

        main.style.overflow = "auto";
        
        if(window.top.system.core.responsive.isPhone()) {
            this.#menu.classList.toggle("collapsed");
        }
    }

    #parseChildren() {
        const children = this.children;
        let buttons = [];
        let pages = [];

        for(let i = 0; i < children.length; i++) {
            if(children[i].tagName == "NAV-VIEW-BUTTON") {
                buttons.push(children[i]);
            }
            if(children[i].tagName == "NAV-VIEW-PAGE") {
                pages.push(children[i]);
            }
        }

        if(buttons.length > 0) {
            for(let i = 0; i < buttons.length; i++) {
                this.#menu.appendChild(buttons[i]);
                buttons[i].onclick = () => {
                    const page_id = buttons[i].getAttribute("page_id");
                    if(page_id != undefined) {
                        this.switchPage(page_id);
                    } else {
                        console.warn(`No page_id attribute found for the button ${buttons[i].innerText}`);
                    }
                }
            }
        } else {
            console.warn("No buttons found in the NavView, please be sure to use the 'nav-view-button' tag");
        }

        if(pages.length > 0) {
            for(let i = 0; i < pages.length; i++) {
                pages[i].style.display = "none";
                this.#content.appendChild(pages[i]);
            }
        } else {
            console.warn("No pages found in the NavView, please be sure to use the 'nav-view-page' tag");
        }

        this.current_page_id = buttons[0].getAttribute("page_id");
    }

    toggleCollapse() {
        this.#menu.classList.toggle("collapsed");
        window.top.postMessage('gwin_pageresize', '*'); //post message to top window to catch it from all other iframe, act like an event
    }

    switchPage(element) {
        if(this.current_page_id != undefined) {
            const current_page = this.querySelector(`nav-view-page[page_id="${this.current_page_id}"]`);
            if(current_page != null) {
                current_page.style.display = "none";
            }
        }
        this.current_page_id = element;
        const page = this.querySelector(`nav-view-page[page_id="${element}"]`);
        if(page != null) {
            page.style.display = "flex";
        } else {
            console.warn(`No page found with the page_id '${element}', please be sure to use the 'nav-view-page' tag`);
        }

        // Update page title
        this.#title.innerText = this.current_page_id.charAt(0).toUpperCase() + this.current_page_id.slice(1);

        // Update button for the new active page
        Object.keys(this.#menu.children).forEach((button) => {
            if(this.#menu.children[button].getAttribute("page_id") != undefined && this.#menu.children[button].getAttribute("page_id") == this.current_page_id) {
                this.#menu.children[button].classList.add("current_page");
            } else {
                this.#menu.children[button].classList.remove("current_page");
            }
        });

        this.#content.parentElement.scrollTop = 0; //Reset page scroll on page change

        window.top.postMessage('gwin_pageupdate', '*'); //post message to top window to catch it from all other iframe, act like an event
    }

    connectedCallback() {
        
        this.#parseChildren();
        this.#build();
    }
}