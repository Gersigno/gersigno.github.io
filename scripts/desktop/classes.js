/**
 * This class create a new *"Shortcut"* on our desktop.
 * @param {string} title ***String***, This text will be shown as the shortcut's title.
 * @param {string} icon ***String***, The relative path of the icon.
 * @param {()=>funcPtr} funcPtr ***function***, The function to execute when clicked **(exemple: ()=>MyFunction())**.
 */
class DesktopIcon {
    constructor(title, icon, funcPtr, shandler) {
        this.title = title;
        this.icon = icon;
        this.funcPtr = funcPtr;
        this.shandler = shandler;
        //Then, we call the createNewShortcut function of our class.
        this.createNewShortcut(funcPtr);
        //Finally, we push our new object into our desktopShortcuts array.
        desktopShortcuts.push(this);
    }
    /**
     * This function create the shortcut element inside our desktop
     * @param {*} onClickFunction The function parameter is required.
     */
    createNewShortcut(onClickFunction) {
        var desktop = document.getElementById("desktop_icons_grid");
    
        var itemButton = document.createElement("button");
        itemButton.id = "shortcut_" + this.shandler;
        itemButton.className = "desktop_icon_layout";
        itemButton.onclick = function () {
            onClickFunction();
        };
    
        itemButton.appendChild(
            Object.assign(document.createElement("img"), {
              className: "desktop_icon",
              src: this.icon
            })
        );
    
        itemButton.appendChild(
            Object.assign(document.createElement("p"), {
              className: "desktop_icon_title",
              innerText: this.title
            })
        );
    
        desktop.appendChild(itemButton);
    }
}