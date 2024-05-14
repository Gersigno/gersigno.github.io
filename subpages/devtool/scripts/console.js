
function sendCommand(input) {
    if(event.keyCode == 13 && input.value != "") {
        devtool.writeLine(input.value);
    }
}