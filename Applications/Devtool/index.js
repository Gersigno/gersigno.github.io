document.addEventListener('DOMContentLoaded', function () {
    const element_events_list = document.getElementById('event-select');
    const events = window.top.system;
    const msg_input = document.getElementById("window-message-input");
    const msg_submit = document.getElementById("window-message-button");

    for (const event in events.events) {
        const option = document.createElement('option');
        option.innerText = event;
        element_events_list.add(option);
    }

    msg_submit.addEventListener('click', function () {
        const msg = msg_input.value;
        if (msg) {
            window.top.postMessage(msg, '*');
            msg_input.value = '';
            console.debug('Send message to top window : ', msg);
        }
    });

    toggle_dev_mode.checked = window.top.system.dev_mode;

    toggle_dev_mode.addEventListener('click', function (e) {
        toggleDevMode();
    });

});

const toggle_dev_mode = document.getElementById('devmode_toggle');

function toggleDevMode() {
    window.top.system.dev_mode = toggle_dev_mode.checked;
}

const nav_view = document.querySelector('nav-view');

window.top.onmessage = function(e) {
    const time = new Date();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const formattedTime = `[${hour}:${minutes}:${seconds}]`;
    const eventlogs = document.getElementById('window-message-textarea');
    const current_logs = eventlogs.innerHTML;
    if(window.top.system.dev_mode) {
        console.log('New window message : ', e);
    }
    eventlogs.innerHTML = current_logs + '\n' + formattedTime + e.data;
    eventlogs.scrollTop = eventlogs.scrollHeight;

    if(e.data === 'gwin_pageupdate') {
        console.debug(window.top.system.dev_mode)
        if(!window.top.system.dev_mode && nav_view.current_page_id != 'home') {
            console.warn('not allowed');
            window.top.system.services.toast.newToast(`/Themes/${window.top.system.services.settings.current.theme_name}/Icons/warning.png`, "Error", "You are not allowed to access this resource !");
            nav_view.switchPage('home');
        }
    }
}