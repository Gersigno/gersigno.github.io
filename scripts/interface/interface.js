var currentPopup; //Store the current opened popup object, undefined if no popup is open.

var opened_windows = []; //Store all the windows existing on our desktop.
var focused_window = ""; //Store the current focused window (if any)

var MovingWindow = ""; //Store the current moving window (if any)

/**
 * This function will create a new popup on our desktop (only one popup can be opened at the same time).
 * @param {string} icon ***String***>[*not required*], The relative path of the icon.
 * @param {string} title ***String***, This text will be shown as the shortcut's title.
 * @param {string} message ***String***, The message of the popup.
 * @param {string} okText ***String***>[*not required*], text of the main button
 * @param {()=>funcPtr} okFunction ***function***, The function to execute when the main button is clicked **(exemple: ()=>MyFunction())**.
 * @param {string} cancelText ***String***>[*not required*], text of the secondary button
 * @param {()=>funcPtr} cancelFunction ***function***, The function to execute when the secondary button is clicked **(exemple: ()=>MyFunction())**.
 */
function UI_CreatePupup(
    icon = "resources/desktop/icons/exe.png",
    title,
    message,
    okText = undefined,
    okFunction = undefined,
    cancelText = undefined,
    cancelFunction = undefined
  ) {    
    new Popup(icon, title, message, okText, okFunction, cancelText, cancelFunction);
}

/**
 * This function should show an ui element to allow our user to change his language
 * TODO: create a localization system.
 */
function UI_ShowLanguageSwitcher() {
    UI_CreatePupup("resources/desktop/icons/lang_english.png","Languages", "Switching between languages is not supported yet ! <br>I apologize for the inconvenience. 😔", "Ok");
}

function createWindow(
    icon = "resources/desktop/icons/exe.png",
    title = "Undefinied window",
    content = "_subpages\\blank\\index.html",
    whandler = "default_handler") {
    new Window(icon, title, content, whandler);
}