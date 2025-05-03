import Wallpaper from '/System/Interface/Wallpaper.js';

export default class ThemeWallpaper extends Wallpaper {
    _logo;

    _index() {
        this._main_html_element = document.createElement("section");
        this._main_html_element.id = "wallpaper";

        const gradiant = document.createElement("div");
        gradiant.className = "wallpaper_gradiant";

        this._logo = document.createElement("div");
        this._logo.className = "wallpaper_logo";

        this._main_html_element.appendChild(this._logo);
        this._main_html_element.appendChild(gradiant);
        document.body.appendChild(this._main_html_element);
    }

    _updateWallpaperLogo() {
        const rgb = color_filter.hexToRgb(window.getComputedStyle(document.documentElement).getPropertyValue('--color-primary').toString());
        const color = new ColorToStylesheet(rgb[0], rgb[1], rgb[2]);
        const solver = new ColorSolver(color);
        const result = solver.solve();
        document.documentElement.style.setProperty("--var-taskbar-icon-hover-color", "\"" + result.filter + "\"");
        super_key.style.cssText = `filter:${result.filter}`;
    }
}