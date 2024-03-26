/**
 * This class create a new *"Shortcut"* on our desktop.
 * @param {string} title ***String***, This text will be shown as the shortcut's title.
 * @param {string} icon ***String***, The relative path of the icon.
 * @param {()=>funcPtr} funcPtr ***function***, The function to execute when clicked **(exemple: ()=>MyFunction())**.
 */
class FolderIcon {
    constructor(title, icon, funcPtr, description, githublink = undefined, shortcutId) {
        this.title = title;
        this.icon = icon;
        this.funcPtr = funcPtr;
        this.description = description;
        this.gitlink = undefined;
        if(githublink != undefined) {
            this.gitlink = githublink.toString().replace("/", "\/");
        }
        this.shortcutId = shortcutId;
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
        var desktop = document.getElementById("folder_icons_grid");

        var item = document.createElement("div");
        item.className = "item";
    
        var itemButton = document.createElement("button");
        itemButton.className = "folder_icon_layout";
        itemButton.onclick = function () {
            onClickFunction();
        };
        item.appendChild(itemButton);

        var imgContainer = itemButton.appendChild(document.createElement("div"));
        imgContainer.className = "imgContainer";
        itemButton.appendChild(imgContainer);

        imgContainer.appendChild(
            Object.assign(document.createElement("img"), {
              className: "folder_icon",
              src: this.icon
            })
        );

        var container = itemButton.appendChild(document.createElement("div"));
        container.className = "folder_leftdiv";
    
        container.appendChild(
            Object.assign(document.createElement("h2"), {
              className: "folder_icon_text",
              innerText: this.title
            })
        );

        container.appendChild(
            Object.assign(document.createElement("p"), {
              className: "folder_icon_text",
              innerText: this.description
            })
        );

        var items = document.createElement("div");
        items.className = "items";

        if(this.gitlink != undefined) {
            var repoLink = this.gitlink;
            
            var gitBtn = document.createElement("button");
            gitBtn.className = "gitButton";

            gitBtn.appendChild(
                Object.assign(document.createElement("img"), {
                className: "git_icon",
                src: "resources/icons/github.png"
                })
            );
            gitBtn.onclick = function () {
                window.open(repoLink, '_blank').focus();
            };
            items.appendChild(gitBtn);

            
            
        }
        var cache_shortcutId = this.shortcutId;
        var gitIssueBtn = document.createElement("button");
            gitIssueBtn.className = "gitButton";
            gitIssueBtn.id = this.shortcutId
            gitIssueBtn.appendChild(
                Object.assign(document.createElement("img"), {
                className: "git_icon",
                src: "resources/icons/shortcut.png",
                })
            );
            gitIssueBtn.onclick = function () {
                callCreateShortcut(cache_shortcutId);
            };
            items.appendChild(gitIssueBtn)
        item.appendChild(items);
        desktop.appendChild(item);
    }
}