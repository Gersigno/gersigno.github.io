var desktopShortcuts = new Array(); //Empty array that will store all of our desktop shortcuts (shortcuts are auto-pushed in this array)

new FolderIcon("Hangman game", "resources/icons/hang.png", ()=>callCreateWindow("hangman"),"A simple Javascript \"pendu\" (Hangman) game with an html/css interface and different difficulties (French words dictionary).\n🥇Objective: Your objective is to guess the secret word by finding one by one the letters that compose it, while making the minimum possible mistakes !","https://github.com/Gersigno/Hangman-Javascript", "hangman");
new FolderIcon("ToDoList", "resources/icons/todolist.png", ()=>callCreateWindow("todolist"),"A simple Javascript ToDoList using LocalStorage with an html/css interface","https://github.com/Gersigno/ToDoList-in-JavaScript-using-localStorage", "todolist");

window.onmessage = function(e) {
  if (e.data == 'settings_updated') {
    setTimeout(() => {
      updateFromSettings();
    }, 100);
  }
};

function updateFromSettings() {
  document.documentElement.style.setProperty("--glass-color-hover", "rgba("+localStorage.getItem("theme_color")+",0.3)")
  document.documentElement.style.setProperty("--main-color-transparant", "rgba("+localStorage.getItem("theme_color")+",0.15)")
  document.documentElement.style.setProperty("--border-radius", (parseInt(localStorage.getItem("theme_rounded") * 8 ) + "px"));
  document.documentElement.style.setProperty("--inner-radius", (parseInt(localStorage.getItem("theme_rounded") * 4 ) + "px"));
  document.documentElement.style.setProperty("--border-width", (parseInt(localStorage.getItem("theme_wider")  )+ 1 + "px"));
}

function callCreateWindow(targetApp) {
  window.top.postMessage('startapp_' + targetApp, '*');
}

function callCreateShortcut(targetApp) {
  window.top.postMessage('addShortcut_' + targetApp, '*');
}

updateFromSettings();