import Controls             from '/System/Core/Controls.js';
import Responsive           from '/System/Core/Responsive.js';
import Taskbar              from '/System/Interface/Taskbar.js';
import Wallpaper            from '/System/Interface/Wallpaper.js';
import Desktop              from '/System/Interface/Desktop.js';
import DesktopIcon          from "/System/Interface/HTML/DesktopIcon.js";
import Window               from "/System/Interface/HTML/Window.js";
import StartMenu            from "/System/Interface/HTML/StartMenu.js";
import Settings             from '/System/Services/Settings.js';
import ThemeManager         from '/System/Services/ThemeManager.js';
import Debug                from '/System/Services/Debug.js';
import ToastManager         from '/System/Services/ToastManager.js';
import ToastNotification    from "/System/Interface/HTML/ToastNotification.js";
import Application          from '/System/Services/Application.js';

export default class System {    

    #infos = {
        version:    'Beta-2.1.1'
    };

    #core = {
        controls:   Controls,
        responsive: Responsive
    };

    #interface = {
        wallpaper:  Wallpaper,
        desktop:    Desktop,
        taskbar:    Taskbar
    };

    #services = {
        debug:      Debug,
        settings:   Settings,
        theme:      ThemeManager,
        toast:      ToastManager
    };

    #utils = {

    };

    #dev_mode = false; //Set to true to enable dev mode

    static events = {
        process_started:        "process_started",
        process_killed:         "process_killed",
        theme_loaded:           "theme_loaded",
        focus_changed:          "focus_changed",
        newview_pagechanged:    "newview_pagechanged"
    }
    
    constructor() {
        window.system = this; //Store our system instance in the window object

        this.#services.debug = new Debug(); //Initialize our debug service in priority to access logs directly
        
        this.#createCustomElements(); // Create our custom html elements

        this.#initComponents(); //Initialize our system's components
        this.#initEvents(); //Initialize our system's events

        this.#dev_mode = window.top.system.services.settings.current.devmode; //Set the dev mode to the current value saved in settings

        if(!system.core.responsive.isDesktop()) {
            alert("For a better experience, visit this website from a computer !");
        }

        setTimeout(() => {
            // system.services.toast.newToast("/resources/gwp_logo_icon.png", "Beta version", "This website is still in development !");
            if(window.top.system.services.settings.current.welcome_read == false) {
                Application.start("Welcome");
            }
        }, 500);
    }

    #createCustomElements() {
        window.customElements.define("desktop-icon",        DesktopIcon);
        window.customElements.define("process-window",      Window);
        window.customElements.define("start-menu",          StartMenu);
        window.customElements.define("toast-notification",  ToastNotification);
    }

    /**
     * Initialize our system
     */
    #initComponents() {
        Object.keys(this.#core).forEach(object => {
            if(typeof(this.#core[object]) === "function") {
                this.#core[object] = new this.#core[object]();
            }
        });        
        Object.keys(this.#services).forEach(object => {
            if(typeof(this.#services[object]) === "function") {
                this.#services[object] = new this.#services[object]();
            }
        });
        Object.keys(this.#interface).forEach(object => {
            if(typeof(this.#interface[object]) === "function") {
                this.#interface[object] = new this.#interface[object]();
            }
        });

        Object.keys(this.#utils).forEach(object => {
            if(typeof(this.#utils[object]) === "function") {
                this.#utils[object] = new this.#utils[object]();
            }
        });
    }

    #initEvents() {
        for(let event in System.events) {
            System.events[event] = new CustomEvent(System.events[event]);
        }
    }

    run(app) {
        Application.start(app);
    }

    /**
     * Return system informations
     * @returns {Object} system informations
     */
    get infos() {
        return this.#infos;
    }

    /**
     * Return core instances
     * @return {Object} core instances
     */
    get core() {
        return this.#core;
    }

    /**
     * Return interface instances
     * @return {Object} interface instances
     */
    get interface() {
        return this.#interface;
    }

    /**
     * Return services instances
     * @return {Object} services instances
     */
    get services() {
        return this.#services;
    }

    /**
     * Return utils instances
     * @return {Object} utils instances
     */
    get utils() {
        return this.#utils;
    }

    /**
     * Return the system events
     * @returns {Object} system events
     */
    get events() {
        return System.events;
    }

    get application() {
        return Application;
    }

    get window() {
        return Window;
    }

    get dev_mode() {
        return this.#dev_mode;
    }
    set dev_mode(value) {
        this.#dev_mode = value;
    }
}