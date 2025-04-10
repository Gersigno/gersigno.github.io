import Application    from '/System/Services/Application.js';

export default class DesktopIcon extends HTMLElement {
    static observedAttributes = ["icon", "icon_description", "text", "openEvent"];

    #child_elements = {};
    #exists         = false;

    constructor() {
        super();
    }

    #update() {
        if(!this.#exists) {
            this.#child_elements.icon       = document.createElement("img");
            this.#child_elements.text       = document.createElement("p");
            
            this.appendChild(this.#child_elements.icon);
            this.appendChild(this.#child_elements.text);
            this.#exists = true;
        }
        this.#child_elements.icon.src       = this.getAttribute("icon");
        this.#child_elements.icon.alt       = this.getAttribute("icon_description");
        this.#child_elements.text.innerText = this.getAttribute("text");
        // if(system.core.responsive.isDesktop()) {
        //     this.ondblclick = () => {
        //         this.#callFunction();
        //     }
        // } else {
            this.onclick = () => {
                this.#callFunction();
            };
        // }
    }

    #callFunction() {
        if(this.getAttribute("openEvent") != undefined) {
            try {
                eval(this.getAttribute("openEvent"));
            } catch (error) {
                // if(error.message.includes(" is not defined") && this.getAttribute("openEvent").includes("new ")) {
                //     try {
                //         const class_module = error.message.split(" is not defined")[0];
                //         import("/System/Modules/" + class_module + ".js").then(module => {
                //             const instance = new module.default();
                //             //console.debug(this.getAttribute("openEvent"), this.getAttribute("openEvent").replace(class_module, "e"))
                //             // try {
                //             //     console.log(module.default);
                //             //eval(this.getAttribute("openEvent"));
                //             // } catch (erreur) {
                //             //     throw new TypeError(erreur);
                //             // }
                //         }).catch(import_e => {
                //             throw new TypeError(import_e)
                //         })
                //     } catch (err) {
                //         throw new TypeError(err);
                //     }                    
                // } else {
                //     console.error(error);
                // }
                console.error(error);
            }
        }
    }

    connectedCallback() {
        this.#update();
        this.tabIndex = '1';
    }
    disconnectedCallback() {
    }

    attributeChangedCallback() {
        this.#update();
    }
}