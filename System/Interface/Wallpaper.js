import ZindexMap from '/System/Utils/ZindexMap.js';

export default class Wallpaper {
    _main_html_element;
    _main_element_id = "wallpaper";

    constructor() {
        this._index();
        if(this._main_html_element != undefined) {
            this._main_html_element.id = this._main_element_id;
            const element = this._main_html_element;
            document.getElementById(this._main_element_id).remove();
            document.body.prepend(element);
            this._main_html_element = element;
            this.#forceZindex();
        }
        
    }

    get element() {
        return this._main_html_element;
    }

    _index() {
        //If extended class do not override our _index methode
        if(this.constructor != Wallpaper)
            this.#loadDefault();
    }

    #loadDefault() {
        console.warn("Default wallpaper loaded, to load a custom wallpaper from your theme, please extend this class and override the _index() method.");
        this._main_html_element = document.createElement("section");
        this._main_html_element.style = `
            background: url('/System/Resources/Assets/Wallpaper/default_wallpaper_light.png');
            background-size: cover;
            width: 100vw;
            height: 100vh;
        `;
        document.body.prepend(this._main_html_element);
    }

    #forceZindex() {
        this._main_html_element.style.zIndex = ZindexMap.map.wallpaper;
    }
}