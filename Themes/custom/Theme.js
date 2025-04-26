import ThemeBase from '/System/Modules/ThemeBase.js';
import ThemeWallpaper from './Wallpaper/Wallpaper.js';
import StartMenu from '/System/Interface/HTML/StartMenu.js';

export default class Theme extends ThemeBase {
    _index() {
        this.wallpaper = new ThemeWallpaper();

        const taskbar = document.querySelector('#taskbar');
        const taskbar_borders = document.createElement('div');
        taskbar_borders.id = 'taskbar_borders';

        taskbar.appendChild(taskbar_borders);

        this._hookStartMenu();
    }

    _destruct() {
        const taskbar_borders = document.querySelector('#taskbar_borders');

        if (taskbar_borders) {
            taskbar_borders.remove();
        }
    }

    _hookStartMenu() {
        const super_button = document.querySelector('#super');
        StartMenu.onOpened = () => {
            super_button.classList.add('opened');
        };
        StartMenu.onClosed = () => {
            super_button.classList.remove('opened');
        };
    }
}