class DevTool {
    constructor() {
        this.settingWriteToLogsToo = true;
        this.writeLine("Hello World!")
    }
    writeLine(...inputs) {
        if(this.settingWriteToLogsToo == true) {
            console.log(...inputs);
        }
        var consoleContent = document.getElementById("console_content");
        consoleContent.innerText = consoleContent.innerText + "\n" + inputs[0] + "\n";
    }
}
var devtool = new DevTool();