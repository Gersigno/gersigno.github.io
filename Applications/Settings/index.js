window.addEventListener("load", (event) => {
    init();
    initEvenets();
})

function init() {
    const theme_dropdown        = document.getElementById("theme_dropdown");
    theme_dropdown.innerHTML    = '';

    const theme_list            = window.top.system.services.theme.listOfThemes;
    const current_theme         = window.top.system.services.settings.current.theme_name

    Object.keys(theme_list).forEach(theme => {
        const option = document.createElement("option");
        option.value = theme;
        option.innerText = theme_list[theme].display_name;
        if(current_theme == theme) {
            option.selected = true;
        }
        theme_dropdown.appendChild(option);
    });
}

function initEvenets() {
    const theme_dropdown        = document.getElementById("theme_dropdown");
    theme_dropdown.addEventListener("change", () => {
        window.top.system.services.settings.update = ["theme_name", theme_dropdown.options[theme_dropdown.selectedIndex].value]
    })
}