export default class HoverEffect {

    constructor() {
        this.#init();
    }

    #init() {
        document.body.addEventListener("mousemove", (e) => {
            requestAnimationFrame(() => this.#onMouseMoved(e));
        })
    }

    #onMouseMoved(e) {
        const new_targets = document.querySelectorAll(".gwin_hover_border");
        Object.keys(new_targets).forEach((key) => {
            const x = system.core.controls.mouse_position.x - new_targets[key].offsetLeft;
            const y = system.core.controls.mouse_position.y - new_targets[key].offsetTop;
            new_targets[key].style.setProperty('--gwin-hover-border-x', x + 'px');
            new_targets[key].style.setProperty('--gwin-hover-border-y', y + 'px');
        });
    }
}