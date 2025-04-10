import ThemeBase from '/System/Modules/ThemeBase.js';

export default class Theme extends ThemeBase {
    // #debug_texts = [];

    _index() {
        console.debug("Debug wallpaper loaded.")

        this.build_id_displays();
    }

    build_id_displays() {
        const elements = document.querySelectorAll("*");
        elements.forEach(element => {
            // console.log(element.parentElement)
            if((element.id != "")) {
                const z_index = element.style.zIndex || (element.parentElement.style.zIndex || 0);
                console.debug(z_index, element)
                const after_element = document.head.appendChild(document.createElement("style"));

                after_element.innerHTML = `
                #${element.id}::after { content: "#${element.id}"; position: absolute; top: ${z_index * 5}px; left: ${z_index * 5}px; color: white; text-shadow: 1px 1px 2px #000, -1px -1px 2px #000;}
                `;
            }
        });
    }
}