export default class Settings {
    #default_settings = {
        theme_name:     "win_11",
        theme_color:    "blue",
        theme_dark:     false,
        welcome_read:   false,
        devmode:        false
    };

    #current_settings;

    constructor() {
        if(localStorage.getItem("settings")) {
            this.#current_settings = JSON.parse(localStorage.getItem("settings"));
        } else {
            this.#current_settings = this.#default_settings;
        }

        // console.debug("Settings loaded", this.#current_settings);
        this.#save();
    }

    set update([key, value]) {
        this.#current_settings[key] = value;
        this.#save();
        if(key == "theme_name") {
            // Load new theme
            window.top.system.services.theme.loadTheme(this.#current_settings.theme_name);
        }
    }

    get current() {
        return this.#current_settings;
    }

    /**
     * Save current settings to local storage
     */
    #save() {
        localStorage.setItem("settings", JSON.stringify(this.#current_settings));
    }
}
