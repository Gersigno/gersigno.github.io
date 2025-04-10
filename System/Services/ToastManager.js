export default class ToastManager {
    #notifications_queue = [];

    constructor() {
        this.#init();
    }

    #init() {
        // console.debug("toast manager init");
    }

    /**
     * Will build and display a new toast notification on our user's screen
     * @param {String} icon_src Notification icon's path
     * @param {String} title Notification title
     * @param {String} message Notification message
     */
    newToast(icon_src, title, message) {
        const new_toast = document.createElement("toast-notification");
        new_toast.setAttribute("icon_src", icon_src);
        new_toast.setAttribute("title", title);
        new_toast.setAttribute("description", message);
        document.body.appendChild(new_toast);

        new_toast.addEventListener("remove", (event) => {
            this.#onToastDestroyed(event.target);
        });

        if(this.#notifications_queue.length > 0) {
            this.#notifications_queue.forEach(notification => {
                notification.remove();
            });
        }
        
        this.#notifications_queue.push(new_toast);
    }

    /**
     * Call this whenever a toast notification is destroyed
     * @param {*} target current destroying notification
     */
    #onToastDestroyed(target) {
        //Remove the target notification from our queue
        this.#notifications_queue.find((notification, index) => {
            if(notification === target) {
                this.#notifications_queue.splice(index, 1);
                return true;
            }
        });
    }
}