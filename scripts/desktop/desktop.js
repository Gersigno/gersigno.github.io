var desktopShortcuts = new Array(); //Empty array that will store all of our desktop shortcuts (shortcuts are auto-pushed in this array)

//First, we create all our default desktop icons
new DesktopIcon("Who am i ?", "resources/desktop/icons/infos.png", ()=>createWindow("resources/desktop/icons/infos.png", "Who am i ?","subpages\\whoami\\index.html","whoami"), "whoami");
new DesktopIcon("Web development", "resources/desktop/icons/folder_web.png",  ()=>createWindow("resources/desktop/icons/folder_web.png", "My web development projects","subpages\\webdev\\index.html","webdev"), "webdev");
new DesktopIcon("Video games development", "resources/desktop/icons/folder_games.png",  ()=>createWindow("resources/desktop/icons/folder_games.png", "My video games development projects","subpages\\blank\\index.html","gamedev"), "gamedev");
new DesktopIcon("GitHub", "resources/desktop/icons/github.png", ()=>UI_CreatePupup("resources/desktop/icons/github.png","GitHub", "Open Gersigno's github profile ?", "Yes, open in a new tab",()=>window.open('https:\/\/github.com\/Gersigno', '_blank').focus(), "Cancel"), "github");
new DesktopIcon("Email me", "resources/desktop/icons/gmail.png", ()=>UI_CreatePupup("resources/desktop/icons/gmail.png","Email me", "My email address: contact.gersigno@gmail.com", "Copy email to clipboard",()=>CopyMailToClipboard(), "Cancel"), "email");
new DesktopIcon("Discord infos", "resources/desktop/icons/discord.png", ()=>createWindow("resources/desktop/icons/discord.png", "Discord server's informations","subpages\\discord\\index.html","discord"), "discord");
new DesktopIcon("Settings", "resources/desktop/icons/settings.png", ()=>createWindow("resources/desktop/icons/settings.png", "Settings","subpages\\settings\\index.html","settings"), "settings");

//Then, we check for any custom shortcuts pinned in our desktop.
checkForShortcuts();

//When all our icons are created, we can animate them in by calling our "BringAllDesktopIcons" function.
BringAllDesktopIcons();

/**
 * This function brings all of our shortcuts in our desktop with an smooth animation.
 */
function BringAllDesktopIcons() {
  var Icon = document.getElementsByClassName("desktop_icon_layout");

  for (let i = 0; i < Icon.length; i++) {
    setTimeout(function timer() {
      Icon[i].classList.add("desktop_icon_bringin");
    }, i * 200);
  }
}


function createShortcut(title, icon, funcPtr, shandler) {
  var found = false;
  for( var i = 0; i < desktopShortcuts.length; i++) {
    if(desktopShortcuts[i].shandler == shandler) {
      found = true;
      localStorage.setItem("shortcut_" + shandler, false);
      if(document.getElementById("shortcut_" + shandler) != undefined) {
        document.getElementById("shortcut_" + shandler).remove();
        desktopShortcuts.splice(i,1);
        new ToastNotify(icon, title, "❌ Shortcut removed");
      }
      break;
    }
  }
  if(found == false) {
    localStorage.setItem("shortcut_" + shandler, true);
    new DesktopIcon(title, icon, funcPtr, shandler);
    document.getElementById("shortcut_" + shandler).classList.add("desktop_icon_bringin");
    new ToastNotify(icon, title, "✅ Shortcut added");
  }
}

function checkForShortcuts() {
  if(localStorage.getItem("shortcut_todolist") == "true") {
    new DesktopIcon("ToDoList", "resources/desktop/icons/todolist.png", ()=>createWindow("resources/desktop/icons/todolist.png", "ToDoList","subpages\\todolist\\index.html","todolist"), "todolist");
  }
  if(localStorage.getItem("shortcut_hangman") == "true") {
    new DesktopIcon("The Hangman game", "resources/desktop/icons/hang.png", ()=>createWindow("resources/desktop/icons/hang.png", "The hangman game (French words dictionary)","subpages\\hangman\\index.html","hangman"), "hangman");
  }
}

function CopyMailToClipboard() {
  navigator.clipboard.writeText("contact.gersigno@gmail.com");
  new ToastNotify("resources/desktop/icons/gmail.png", "Email", "✅ Copied to clipboard");
}