export default class Icon extends HTMLElement {
    static observedAttributes = ["icon", "size"];

    constructor() {
        super();
    }

    connectedCallback() {
        this.classList.add("icon_" + this.getAttribute("icon"), "icon_" + this.getAttribute("size"));

        const size = this.computedStyleMap().get("background-size");

        this.style.width = size;
        this.style.height = size;
    }
}