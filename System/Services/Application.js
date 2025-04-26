import Window from '/System/Interface/HTML/Window.js'

export default class Application {

    static async start(app_uaid) {
        let creation_allow = true;
        const list = await Application.getAll();
        Object.keys(list).forEach(element => {
            if(element == app_uaid) {
                console.log(`Starting application : ${element}`);
                if(list[element].dev_only == true && !window.top.system.dev_mode) {
                    window.top.system.services.toast.newToast(`/Themes/${window.top.system.services.settings.current.theme_name}/Icons/warning.png`, "Error", "You are not allowed to access this resource !");
                    return;
                }
                if(list[element].single_process_only != undefined && list[element].single_process_only) {
                    // Check for application instances for target application with single instance only property set tto true
                    Window.instances.forEach(instance => {
                        if(instance.getAttribute("application") == element.toString() && creation_allow == true) {
                            // If application is single instance only and is already running, bring it to front
                            creation_allow = false;
                            instance.style.display = "flex";
                            instance.bringToFront();
                        }
                    });
                }
                if(creation_allow) {
                    const data = list[element];
                    const new_window = document.createElement("process-window");
                    new_window.setAttribute("application", element);
                    Object.keys(data).forEach(attribut => {
                        new_window.setAttribute(attribut, data[attribut])
                    });
                    document.body.appendChild(new_window);
                }
            }
        });
    }

    static async getAll() {
        let list;
        await fetch(`/Applications/applicationList.json?p=${Math.random()}`).then(async (response) => {
            if (response.ok) {
                list = await response.json();
            } else {
                throw new TypeError(response.statusText);
            }
        }).catch(e => {
            console.warn(e); 
            return;
        });
        
        Object.keys(list).forEach(element => {
            if(list[element].dev_only == true && !window.top.system.dev_mode) {
                delete list[element];
            }
        });
        return list;
    }
}