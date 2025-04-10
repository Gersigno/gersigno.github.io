export default class Vec2d_t {
    #x = undefined;
    #y = undefined;

    set x(new_x) {
        this.#x = new_x;
    }

    set y(new_y) {
        this.#y = new_y;
    }

    get x() {
        return this.#x;
    }

    get y()  {
        return this.#y;
    }

    get json() {
        return {
            x: this.#x,
            y: this.#y
        }
    }

    constructor(x = undefined, y = undefined) {
        this.#x = x;
        this.#y = y;
    }

    multiply(value) {
        this.#x = this.#x != undefined ? (this.#x * value) : this.#x;
        this.#y = this.#y != undefined ? (this.#y * value) : this.#y;
    }

    divide(value) {
        this.#x = this.#x != undefined ? (this.#x / value) : this.#x;
        this.#y = this.#y != undefined ? (this.#y / value) : this.#y;
    }

    add(value) {
        this.#x = this.#x != undefined ? (this.#x + value) : this.#x;
        this.#y = this.#y != undefined ? (this.#y + value) : this.#y;
    }

    substract(value) {
        this.#x = this.#x != undefined ? (this.#x - value) : this.#x;
        this.#y = this.#y != undefined ? (this.#y - value) : this.#y;
    }
}