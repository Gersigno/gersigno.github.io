'use strict';

export default class ColorToStylesheet {
    constructor(r, g, b) {
        this.set(r, g, b);
    }

    /**
     * Convert ANSI codes to CSS color property 
     * @param {*} text 
     * @returns 
     */
    static ansiToCss(text) {
        const ansi_regex = /\x1b\[(\d+;?)*m/g;
        const styles = [];
        const styles_map = {
            "00": "font-family: 'MesloLGS NF'; font-weight: normal; padding: 0; margin: 0; font-size: 1.1em;",
            "01": "font-weight: 800;",
            "02": "font-weight: 800; font-size: 1.1em;",
            "10": "color: inherit; background-color: inherit; text-decoration: none;",
            "11": "color: inherit;",
            "12": "background-color: inherit;",
            "13": "text-decoration: none;",
            "20": "color: black; text-decoration: underline;",
            "30": "color: black;",
            "31": "color: red;",
            "32": "color: blue;",
            "33": "color: orange;",
            "34": "color: dodgerblue;",
            "35": "color: peru;",
            "36": "color: cyan;",
            "37": "color: white;",
            "38": "color: green;",
            "40": "background-color: black;",
            "41": "background-color: red;",
            "42": "background-color: blue;",
            "43": "background-color: orange;",
            "44": "background-color: dodgerblue;",
            "45": "background-color: peru;",
            "46": "background-color: cyan;",
            "47": "background-color: white;",
            "48": "background-color: green;",

        };

        let css_styles = [];
        let formatted_text = "";
        let last_index = 0;

        text.replace(ansi_regex, (match, codes, offset) => {
            if (offset > last_index) {
                formatted_text += `%c${text.slice(last_index, offset)}`;
                css_styles.push(styles.join(" "));
            }
            if (!codes) {
                styles = [];
            } else {
                //Apply ANSI code to styles
                codes.split(";").forEach(code => {
                    if (styles_map[code]) {
                        styles.push(styles_map[code]);
                    }
                });
            }
            last_index = offset + match.length;
            return "";
        });

        if (last_index < text.length) {
            formatted_text += `%c${text.slice(last_index)}`;;
            css_styles.push(styles.join(" "));
        }
        return { formatted_text, css_styles };
    }

    /**
     * ? Credits: sosuke (Barrett Sonntag)
     * Convert current rgb color to css string format ("rgb(x,x,x)")
     * @returns {String} css string
     */
    toString() {
        return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
    }

    set(r, g, b) {
        this.r = this.clamp(r);
        this.g = this.clamp(g);
        this.b = this.clamp(b);
    }

    hueRotate(angle = 0) {
        angle = angle / 180 * Math.PI;
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);

        this.multiply([
            0.213 + cos * 0.787 - sin * 0.213,
            0.715 - cos * 0.715 - sin * 0.715,
            0.072 - cos * 0.072 + sin * 0.928,
            0.213 - cos * 0.213 + sin * 0.143,
            0.715 + cos * 0.285 + sin * 0.140,
            0.072 - cos * 0.072 - sin * 0.283,
            0.213 - cos * 0.213 - sin * 0.787,
            0.715 - cos * 0.715 + sin * 0.715,
            0.072 + cos * 0.928 + sin * 0.072,
        ]);
    }

    grayscale(value = 1) {
        this.multiply([
            0.2126 + 0.7874 * (1 - value),
            0.7152 - 0.7152 * (1 - value),
            0.0722 - 0.0722 * (1 - value),
            0.2126 - 0.2126 * (1 - value),
            0.7152 + 0.2848 * (1 - value),
            0.0722 - 0.0722 * (1 - value),
            0.2126 - 0.2126 * (1 - value),
            0.7152 - 0.7152 * (1 - value),
            0.0722 + 0.9278 * (1 - value),
        ]);
    }

    sepia(value = 1) {
        this.multiply([
            0.393 + 0.607 * (1 - value),
            0.769 - 0.769 * (1 - value),
            0.189 - 0.189 * (1 - value),
            0.349 - 0.349 * (1 - value),
            0.686 + 0.314 * (1 - value),
            0.168 - 0.168 * (1 - value),
            0.272 - 0.272 * (1 - value),
            0.534 - 0.534 * (1 - value),
            0.131 + 0.869 * (1 - value),
        ]);
    }

    saturate(value = 1) {
        this.multiply([
            0.213 + 0.787 * value,
            0.715 - 0.715 * value,
            0.072 - 0.072 * value,
            0.213 - 0.213 * value,
            0.715 + 0.285 * value,
            0.072 - 0.072 * value,
            0.213 - 0.213 * value,
            0.715 - 0.715 * value,
            0.072 + 0.928 * value,
        ]);
    }

    multiply(matrix) {
        const newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
        const newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
        const newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
        this.r = newR;
        this.g = newG;
        this.b = newB;
    }

    brightness(value = 1) {
        this.linear(value);
    }
    contrast(value = 1) {
        this.linear(value, -(0.5 * value) + 0.5);
    }

    linear(slope = 1, intercept = 0) {
        this.r = this.clamp(this.r * slope + intercept * 255);
        this.g = this.clamp(this.g * slope + intercept * 255);
        this.b = this.clamp(this.b * slope + intercept * 255);
    }

    invert(value = 1) {
        this.r = this.clamp((value + this.r / 255 * (1 - 2 * value)) * 255);
        this.g = this.clamp((value + this.g / 255 * (1 - 2 * value)) * 255);
        this.b = this.clamp((value + this.b / 255 * (1 - 2 * value)) * 255);
    }

    hsl() {
        // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;

                case g:
                    h = (b - r) / d + 2;
                    break;

                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return {
            h: h * 100,
            s: s * 100,
            l: l * 100,
        };
    }

    clamp(value) {
        if (value > 255) {
            value = 255;
        } else if (value < 0) {
            value = 0;
        }
        return value;
    }

    hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16),
            ]
            : null;
    }
}