import ZindexMap    from '/System/Utils/ZindexMap.js';

export default class Desktop {
    #elements = {
        container: undefined,
        items_list: undefined
    };
    #shortcuts = [];
    #path_list_file = "/System/desktopShortcuts.json";

    get elements() {
        return this.#elements;
    }

    constructor() {
        this.#init();
    }

    #init() {
        this.#elements.container                = document.createElement("section");
        this.#elements.container.id             = "desktop";
        this.#elements.container.style.zIndex   = ZindexMap.map.desktop;
        
        this.#elements.items_list               = document.createElement("ol");
        this.#elements.items_list.id            = "desktop_icons_grid";

        this.#elements.container.appendChild(this.#elements.items_list);
        document.body.appendChild(this.#elements.container);

        this.updateShortcutList();
    }

    async updateShortcutList() {
        await fetch(this.#path_list_file).then(async (response) => {
            if (response.ok) {
                this.#shortcuts = await response.json();
                if(Object.keys(this.#shortcuts).length === 0) {
                    throw new TypeError("No desktop shortcut list found in List.json file (file is empty)");
                }
                for(let shortcut of Object.keys(this.#shortcuts)) {
                    const element = document.createElement("desktop-icon");
                    element.setAttribute("icon", `/Themes/${system.services.settings.current.theme_name}/Icons/Applications/${shortcut}.png`);
                    element.setAttribute("icon_description", this.#shortcuts[shortcut].icon_description);
                    element.setAttribute("text", this.#shortcuts[shortcut].text);
                    element.setAttribute("openEvent", this.#shortcuts[shortcut].open_command);
                    this.elements.items_list.appendChild(element);
                }
            } else {
                throw new TypeError(response.statusText);
            }
        }).catch(e => {
            console.error(`Desktop shortcut:`, e.message); 
        });
    }
}