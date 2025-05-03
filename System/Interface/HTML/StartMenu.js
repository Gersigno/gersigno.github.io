import System from '/System/Core/System.js';
import ZindexMap from '/System/Utils/ZindexMap.js';
import Application from '/System/Services/Application.js';

export default class StartMenu extends HTMLElement {
    constructor() {
        super();
    }

    static onOpened() {}
    static onClosed() {}

    #elements = {
        left_menu: document.createElement("menu"),
        right_menu: document.createElement("menu")
    };

    #click_event;

    #init() {
        this.appendChild(this.#elements.left_menu);
        this.appendChild(this.#elements.right_menu);

        this.style.zIndex = ZindexMap.map.startmenu;

        this.#buildLeftMenu();
        this.#buildApplicationsList();
        StartMenu.onOpened();

        document.addEventListener("mousedown", this.#handleClick);
    }

    #handleClick = (event) => {
        if (!this.contains(event.target) && event.target.id != "super") {
            document.removeEventListener("mousedown", this.#handleClick);
            this.remove();
        }
    };

    /**
     * Build the left part of our start menu, aka the shutdown, account, settings and collapse buttons
     */
    #buildLeftMenu() {
        const btn_collapse = document.createElement("button");
        const btn_account = document.createElement("button");
        const btn_settings = document.createElement("button");
        const btn_shutdown = document.createElement("button");

        const icon_collapse = document.createElement("button-icon");
        const icon_account = document.createElement("button-icon");
        const icon_settings = document.createElement("button-icon");
        const icon_shutdown = document.createElement("button-icon");

        icon_collapse.setAttribute("icon", "burger");
        icon_collapse.setAttribute("size", "small");
        btn_collapse.appendChild(icon_collapse);

        icon_account.setAttribute("icon", "github");
        icon_account.setAttribute("size", "small");
        btn_account.appendChild(icon_account);

        icon_settings.setAttribute("icon", "settings");
        icon_settings.setAttribute("size", "small");
        btn_settings.appendChild(icon_settings);

        icon_shutdown.setAttribute("icon", "shutdown");
        icon_shutdown.setAttribute("size", "small");
        btn_shutdown.appendChild(icon_shutdown);

        btn_account.addEventListener("click", () => {
            window.open("https://github.com/Gersigno/gersigno.github.io", "_blank");
        });

        btn_settings.addEventListener("click", () => {
            Application.start('Settings');
        });

        btn_shutdown.addEventListener("click", () => {
            if (confirm("Are you sure to close this page ? \n(You will be redirected to my GitHub profile)")) {
                window.location.href = "https://github.com/Gersigno";
            }
        });

        this.#elements.left_menu.appendChild(btn_collapse);
        this.#elements.left_menu.appendChild(btn_account);
        this.#elements.left_menu.appendChild(btn_settings);
        this.#elements.left_menu.appendChild(btn_shutdown);
    }

    /**
     * Return the list of all applications 
     * @returns {Promise} List of applications (sorted by alphabetical order)
     */
    async #getApplications() {
        const list = await Application.getAll();
        const sortedList = Object.keys(list)
            .sort((a, b) => list[a].display_name.localeCompare(list[b].display_name))
            .reduce((acc, key) => {
                acc[key] = list[key];
                return acc;
            }, {});
        return sortedList;
    }

    /**
     * Build the applications list of our start menu
     */
    async #buildApplicationsList() {
        const section_title = document.createElement("p");
        section_title.innerText = "Recently added";
        section_title.classList.add("startmenu_section_title");

        this.#elements.right_menu.appendChild(section_title);

        // const temp_list = await Application.getAll();
        const list = await this.#getApplications();

        Object.keys(list).forEach(application => {

            const container = document.createElement("button");
            const icon = document.createElement("img");
            const title = document.createElement("p");

            container.classList.add("startmenu_application");
            container.classList.add("gwin_hover_border");
            icon.src = `/Themes/${system.services.settings.current.theme_name}/Icons/Applications/${application}.png`;

            title.innerText = list[application].display_name;

            container.appendChild(icon);
            container.appendChild(title);
            this.#elements.right_menu.appendChild(container);

            //Start the target application on click event for our button
            container.addEventListener("click", () => {
                Application.start(application);
                this.remove();
            });
        });
    }

    connectedCallback() {
        this.#init();
    }

    disconnectedCallback() {
        StartMenu.onClosed();
        document.removeEventListener("mousedown", this.#handleClick);
    }
}