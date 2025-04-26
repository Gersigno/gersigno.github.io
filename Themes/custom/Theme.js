import ThemeBase from '/System/Modules/ThemeBase.js';
import ThemeWallpaper from './Wallpaper/Wallpaper.js';

export default class Theme extends ThemeBase {
    _index() {
        this.wallpaper = new ThemeWallpaper();

        const taskbar = document.querySelector('#taskbar');
        const taskbar_borders = document.createElement('div');
        taskbar_borders.id = 'taskbar_borders';

        taskbar.appendChild(taskbar_borders);
    }

    _destruct() {
        const taskbar_borders = document.querySelector('#taskbar_borders');

        if (taskbar_borders) {
            taskbar_borders.remove();
        }
    }
}