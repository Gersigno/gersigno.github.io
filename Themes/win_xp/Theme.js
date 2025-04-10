import ThemeBase from '/System/Modules/ThemeBase.js';
import ThemeWallpaper from './Wallpaper/Wallpaper.js';
import System from '/System/Core/System.js';
import Window from '/System/Interface/HTML/Window.js';

export default class Theme extends ThemeBase {
    _index() {
        this.wallpaper = new ThemeWallpaper();
        
        this._hookStartMenu();
        this._hookTaskbarIcons();
        system.interface.taskbar.listUpdated();
    }

    _hookStartMenu() {
        const super_btn = document.getElementById("super");
        super_btn.addEventListener("click", this._buildStartMenuHeader);
    }

    _buildStartMenuHeader() {
        const start_menu = document.querySelector("start-menu");
        if(start_menu != null) {
            //menu exists, so our user just opened it
            const menu_header = document.createElement("header");
            const profile_picture = document.createElement("img");
            const username = document.createElement("p");

            profile_picture.src = "https://avatars.githubusercontent.com/u/136721109";

            username.innerText = "Gersigno";

            menu_header.appendChild(profile_picture);
            menu_header.appendChild(username);
            start_menu.appendChild(menu_header);
        }
    }

    _hookTaskbarIcons() {
        system.interface.taskbar.listUpdated = () => {
            const applist = Window.instances;

            applist.forEach(application => {
                const taskbar_icon = document.getElementById(application.id + "_taskbar_shortcut").parentElement;
                const appname_element = document.createElement("p");
                
                appname_element.innerText = application.getAttribute("display_name");
                taskbar_icon.appendChild(appname_element);
            });
        }
    }

    _destruct() {
        const taskbar_icons = document.getElementById("taskbar_applist").children;
        const super_btn = document.getElementById("super");

        super_btn.removeEventListener("click", this._buildStartMenuHeader);

        //Reset listupdate event to empty function
        system.interface.taskbar.listUpdated = () => {}; 
        
        //Remove each taskbar button texts
        Object.keys(taskbar_icons).forEach(icon => {
            const text = taskbar_icons[icon].querySelector("p");
            text.remove();
        })
    }
}