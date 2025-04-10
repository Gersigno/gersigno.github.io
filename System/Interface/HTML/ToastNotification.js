export default class ToastNotification extends HTMLElement {
    static observedAttributes = [
        "icon_src",
        "title",
        "description"
    ];

    #delay = 5000; //Delay in milliseconds before destroying our toast notification
    #fade_duration = 200; //Duration of the fade in/out animation
    
    constructor() {
        super();
    }

    /**
     * Initilisation of our toast notification
     */
    #init() {
        const icon          = document.createElement("img");
        const section       = document.createElement("section");
        const title         = document.createElement("h5");
        const description   = document.createElement("h6");

        icon.src                = this.getAttribute("icon_src");
        title.innerText         = this.getAttribute("title");
        description.innerText   = this.getAttribute("description");

        // this.classList.add("gwin_hover_border");
        this.classList.add("open");
        this.style["animation-duration"] = `${this.#fade_duration}ms`;

        setTimeout(() => {
            if(this != null) {
                this.classList.remove("open");
            }
        }, this.#fade_duration);

        this.appendChild(icon);
        section.appendChild(title);
        section.appendChild(description);
        this.appendChild(section);

        setTimeout(() => {
            if(this != null) {
                this.classList.add("close");
                setTimeout(() => {
                    this.remove();
                }, this.#fade_duration);
            }
        }, this.#delay);
    }

    connectedCallback() {
        this.#init();
    }

    disconnectedCallback() {
        this.dispatchEvent(new Event("remove"));
    }
}