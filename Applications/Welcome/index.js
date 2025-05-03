async function confirmOpened() {
    window.top.system.services.settings.update = ["welcome_read", true];
    const running_apps =  await window.top.system.window.instances;
    const welcome_app = running_apps.find(app => app.getAttribute("application") == "Welcome");

    welcome_app.close();
}
