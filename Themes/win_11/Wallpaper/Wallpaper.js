import Wallpaper from '/System/Interface/Wallpaper.js';

export default class ThemeWallpaper extends Wallpaper {
    _index() {
        this._main_html_element = document.createElement("section");
        this._main_html_element.id = "wallpaper";
        document.body.appendChild(this._main_html_element);
    }
}