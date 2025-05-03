import System from '/System/Core/System.js';
import ThemeBase from '/System/Modules/ThemeBase.js';
import ColorToStylesheet from '/System/Utils/ColorToStylesheet.js';
import ColorSolver from '/System/Utils/ColorSolver.js';

export default class ThemeManager {
    #path_list_file = "/Themes/List.json";
    #filename_css = "/theme.css";
    #filename_js = "/Theme.js";
    static list;
    #current_js = {};

    constructor() {
        this.#readThemeFiles();

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.title = "current_theme";
        document.head.appendChild(link);
    }

    get listOfThemes() {
        return ThemeManager.list;
    }

    async loadTheme(theme) {
        if(this.#isThemeValid(theme)) {
            const css = await this.#doesFileExists(theme, this.#filename_css);
            if(css) {
                //If theme have an valid CSS file, load it into our page's header
                document.querySelector("link[title='current_theme']").href = "/Themes/" + theme + this.#filename_css;
            }
            
            if(this.#current_js.instance != undefined) {
                this.#current_js.instance.__proto__._destruct(); //Call destruct method (if it exists)
                //If a ThemeBase instance exists, we detroy it.
                delete this.#current_js.instance;
            }
            import("/Themes/" + theme + this.#filename_js).then(module => {
                if(module.default.prototype instanceof ThemeBase) {
                    if(this.#current_js.instance != undefined) {
                        //If a ThemeBase instance exists, we detroy it.
                        delete this.#current_js.instance;
                    }
                    //If theme's js entry file is an instance of ThemeBase
                    this.#current_js.instance = new module.default();
                } else {
                    throw new TypeError(module.default.name + " is not extended from ThemeBase ! Could not load theme");
                }
            }).catch(e => {
                console.error(e);
            });
            this.#updateIcons();
            
            const color_filter  = new ColorToStylesheet();
            const rgb = color_filter.hexToRgb(window.getComputedStyle(document.documentElement).getPropertyValue('--color-primary').toString());
            const color = new ColorToStylesheet(rgb[0], rgb[1], rgb[2]);
            const solver = new ColorSolver(color);
            const result = solver.solve();
            document.querySelector(':root').style.setProperty("--var-taskbar-icon-hover-color", `${result.filter.replace(";", "")}`);
                    
            document.dispatchEvent(System.events.theme_loaded);
            window.postMessage("theme_update", "*");
        }
    }

    /**
     * @private
     * Read theme list file and store it in our property #list
     */
    async #readThemeFiles() {
        await fetch(this.#path_list_file).then(async (response) => {
            if (response.ok) {
                ThemeManager.list = await response.json();
                if(Object.keys(ThemeManager.list).length === 0) {
                    throw new TypeError("No theme found in List.json file (file is empty)");
                }
                for(let theme of Object.keys(ThemeManager.list)) {
                    this.#isThemeValid(theme);
                }
                this.loadTheme(system.services.settings.current.theme_name);
            } else {
                throw new TypeError(response.statusText);
            }
        }).catch(e => {
            console.error(`Theme:`, e.message); 
        });
    }

    /**
     * @private
     * Check if our intended theme is valid
     * @param {Object} theme 
     * @returns {boolean} is theme valid
     */
    async #isThemeValid(theme) {
        let is_valid = false;
        try {
            if(Object.keys(ThemeManager.list).includes(theme)) {
                is_valid = true;
            } else {
                throw new TypeError(`"${ThemeManager[theme].display_name}" key do not exists is your theme list, make sur to enter your folder name correctly in the List.json file`);
            }
        } catch(e) {
            console.error(`Theme:`, e.message);
        }
        return is_valid;
    }

    /**
     * @private
     * Check for theme files existence
     * @param {Object} theme Theme data
     * @param {String} filetype File type
     * @param {String} file File path
     * @returns {boolean} does file exists 
     */
    async #doesFileExists(theme, file_name) {
        const file = "/Themes/" + theme + file_name;
        let found = false;

        await fetch(file).then(async (response) => {
            if (!response.ok) {
                throw new TypeError(response.statusText);
            } else {
                await response.text();
                found = true;
            }
        }).catch(e => {
            console.warn(`No ${file_name} found for the theme ${this.ThemeManager[theme].display_name} in the folder '${theme}' (${file})`); 
            found = false;
        });
        return found;
    }

    #updateIcons() {
        const new_theme_path = "/Themes/" + system.services.settings.current.theme_name;
        const imgs = document.querySelectorAll("img");
        for(let img of imgs) {
            if(img.src.includes("/Themes/")) {
                const path_end = img.src.split("/Themes/")[1];
                const path_end_split = path_end.substring(path_end.indexOf('/') + 1);
                img.src = new_theme_path + "/" + path_end_split;
            }
        }
    }
}