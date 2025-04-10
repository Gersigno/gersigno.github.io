import ThemeBase from '/System/Modules/ThemeBase.js';
import ThemeWallpaper from './Wallpaper/Wallpaper.js';

export default class Theme extends ThemeBase {
    _index() {
        this.wallpaper = new ThemeWallpaper();
    }
}