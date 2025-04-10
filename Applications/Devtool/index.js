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

});

window.top.onmessage = function(e) {
    const time = new Date();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const formattedTime = `[${hour}:${minutes}:${seconds}]`;
    const eventlogs = document.getElementById('window-message-textarea');
    const current_logs = eventlogs.innerHTML;
    console.debug('New window message : ', e);
    eventlogs.innerHTML = current_logs + '\n' + formattedTime + e.data;
    eventlogs.scrollTop = eventlogs.scrollHeight;
}

