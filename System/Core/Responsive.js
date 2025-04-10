export default class Responsive {
    #device_sizes = {
        phone: 500,
        tablet: 960
    }; // Default device sizes (screen width)

    /**
     * Is device a phone ?
     * @returns {boolean} True if device is a phone
     */
    isPhone() {
        const viewport_w = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        return (viewport_w < this.#device_sizes.phone);
    }

    /**
     * Is device a tablet ?
     * @returns {boolean} True if device is a tablet
     */
    isTablet() {
        const viewport_w = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        return (viewport_w < this.#device_sizes.tablet && viewport_w > this.#device_sizes.phone);
    }

    /**
     * Is device a desktop ?
     * @returns {boolean} True if device is a desktop
     */
    isDesktop() {
        const viewport_w = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        return (viewport_w > this.#device_sizes.tablet);
    }    
}