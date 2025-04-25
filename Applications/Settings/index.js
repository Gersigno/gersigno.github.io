window.addEventListener("load", (event) => {
    init();
    updateThemePreview();
})

function init() {
    const theme_list            = window.top.system.services.theme.listOfThemes;
    const current_theme         = window.top.system.services.settings.current.theme_name
    const theme_list_element    = document.getElementById("theme_list");

    Object.keys(theme_list).forEach(theme => {
        const theme_element = document.createElement("button");
        const theme_preview = document.createElement("img");
        const theme_display_name = document.createElement("p");

        theme_preview.src = `/Themes/${theme}/preview.png`;
        theme_preview.alt = theme_list[theme].display_name;
        theme_display_name.innerText = theme_list[theme].display_name;

        theme_element.addEventListener("click", () => {
            if(theme == "win_xp" && window.top.system.core.responsive.isPhone()) {
                window.top.system.services.toast.newToast(`/Themes/${window.top.system.services.settings.current.theme_name}/Icons/warning.png`, "Error", "This theme is not available for this device!");
                return;
            } else {
                window.top.system.services.settings.update = ["theme_name", theme];
            }
        });
        theme_element.id = "theme_select_" + theme;

        theme_element.appendChild(theme_preview);
        theme_element.appendChild(theme_display_name);
        theme_element.className = "button btn_theme_preview";
        theme_list_element.appendChild(theme_element);
    });
}

window.top.onmessage = function(event) {
    const data = event.data;
    if(data == "theme_update") {
        updateThemePreview();
    }
}

function updateThemePreview() {
    const theme_list            = window.top.system.services.theme.listOfThemes;
    const current_theme         = window.top.system.services.settings.current.theme_name;
    const theme_list_element    = document.getElementById("theme_list");

    const preview_img           = document.getElementById("current_theme_preview");
    const preview_display_name  = document.getElementById("current_theme_displayname");
    const preview_author        = document.getElementById("current_theme_author");
    const preview_description   = document.getElementById("current_theme_description");
    const preview_credits       = document.getElementById("current_theme_credits");

    preview_img.src             = `/Themes/${current_theme}/preview.png`;
    preview_img.alt             = theme_list[current_theme].display_name;

    preview_credits.innerHTML = "";

    preview_display_name.innerText = theme_list[current_theme].display_name;
    preview_author.innerText       = "by " + theme_list[current_theme].author;
    preview_description.innerText  = theme_list[current_theme].description;
    theme_list[current_theme].credits.forEach(resource => {
        const credit_element = document.createElement("li");
        credit_element.innerHTML = `<p>${resource}</p>`;
        preview_credits.appendChild(credit_element);
    });

    Object.keys(theme_list_element.children).forEach(element => {
        const target_theme = theme_list_element.children[element].id.replace("theme_select_", "")
        target_theme == current_theme ? theme_list_element.children[element].classList.add("selected") : theme_list_element.children[element].classList.remove("selected");
    });
}