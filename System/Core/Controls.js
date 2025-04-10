export default class Controls {
    #mouse_position = { 
        x: undefined, 
        y: undefined 
    };

    constructor() {
        this.#initEvents();
    }

    /**
     * Returns the current mouse position.
     * @returns {Object} The current mouse position.
     */
    get mouse_position() {
        return this.#mouse_position;
    }

    /**
     * Initialize our events listeners.
     */
    #initEvents() {
        window.addEventListener('mousemove', (event) => {
            this.#mouse_position.x = event.clientX;
            this.#mouse_position.y = event.clientY;
        });
    }
}