export default class Effects {
    static highlightElement(html_element, duration = 1000) {
        if(html_element != undefined && !html_element.classList.contains('highlight_fx')) {
            const existingAnimation = getComputedStyle(html_element).animation;
            const highlightAnimation = `highlight_animation 3000ms linear infinite`;

            html_element.classList.add('highlight_fx');

            html_element.style.animation = `${existingAnimation}, ${highlightAnimation}`;
            
            setTimeout(function (element, old_animations) {
                element.style.animation = `${old_animations}, highlight_animation_fadeout 1000ms ease forwards`;
                    setTimeout(function (elem, base_animation) {
                        element.style.animation = old_animations;
                        elem.classList.remove("highlight_fx");
                    }, 1000, element, old_animations);
            }, duration, html_element, existingAnimation);
        }
    }
}