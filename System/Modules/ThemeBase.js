export default class ThemeBase {
    #wallpaper;

    get wallpaper() {
        return this.#wallpaper;
    }

    set wallpaper(new_wallpaper_element) {
        this.#wallpaper = new_wallpaper_element;
    }

    constructor() {
        this._index();
    }

    _index() {
        console.error("Please extend this class and override the _index() method to load your theme.");
        //services.theme.load
    }

    _destruct() {

    }
}