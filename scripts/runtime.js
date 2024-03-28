var CurrentTimeElement = document.getElementById('CurrentTime'); //store our currentTime element in a variable

//Then, we call our function to update our time.
startTime();

/**
 * This function updates the current time display, it calls itself indefinitely every second.
 */
function startTime() {
    let today = Date.now()
    var dateFormat = "d/m/Y H:i";
    var formatted = format(today, dateFormat);
    CurrentTimeElement.innerHTML = formatted;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function toDate(date) {
  if (date === void 0) {
    return new Date(0);
  }
  if (isDate(date)) {
    return date;
  } else {
    return new Date(parseFloat(date.toString()));
  }
}

function isDate(date) {
  return date instanceof Date;
}

/**
 * Return the current time/date formatted as requested
 * @param {Date} date Date format object
 * @param {string} format requested format ***(exemple: "d/m/Y H:i")***
 * @returns 
 */
function format(date, format) {
  var d = toDate(date);

  return format
    .replace(/Y/gm, (d.getFullYear() - 2000).toString())
    .replace(/m/gm, ("0" + (d.getMonth() + 1)).substr(-2))
    .replace(/d/gm, ("0" + (d.getDate() + 0)).substr(-2))
    .replace(/H/gm, ("0" + (d.getHours() + 0)).substr(-2))
    .replace(/i/gm, ("0" + (d.getMinutes() + 0)).substr(-2))
    .replace(/s/gm, ("0" + (d.getSeconds() + 0)).substr(-2))
    .replace(/v/gm, ("0000" + (d.getMilliseconds() % 1000)).substr(-3));
}


/**
 * Setup communication between iframes (window's content) and our interface using onmessage event.
 *  
 */
window.onmessage = function(e) {
  if(typeof(e.data) == "string") {
      //devtool comunication test
      if (e.data == 'ping') {
          console.log('[runtime] pong');
      }

      //debug: send an settings_updated message to every iframes.
      if (e.data == 'debug_settings_updates') {
        SETTINGS_UPDATED();
      }

      //Start applications
      if (e.data == 'startapp_hangman') {
        createWindow("resources/desktop/icons/hang.png", "The hangman game (French words dictionary)","subpages\\hangman\\index.html","hangman");
        for(var i = 0; i < opened_windows.length; i++) {
          if(opened_windows[i].whandler == focused_window) {
            opened_windows[i].iframe.focus();
            trackClick();
            break;
          }
        }
      }
      if (e.data == 'startapp_todolist') {
        createWindow("resources/desktop/icons/todolist.png", "ToDoList","subpages\\todolist\\index.html","todolist");
        for(var i = 0; i < opened_windows.length; i++) {
          if(opened_windows[i].whandler == focused_window) {
            opened_windows[i].iframe.focus();
            trackClick();
            break;
          }
        }
      }

      //add shortcuts to desktop
      if (e.data == 'addShortcut_todolist') {
        createShortcut("ToDoList", "resources/desktop/icons/todolist.png", ()=>createWindow("resources/desktop/icons/todolist.png", "ToDoList","subpages\\todolist\\index.html","todolist"), "todolist");
      }
      if(e.data == 'addShortcut_hangman') {
        createShortcut("The Hangman game", "resources/desktop/icons/hang.png", ()=>createWindow("resources/desktop/icons/hang.png", "The hangman game (French words dictionary)","subpages\\hangman\\index.html","hangman"), "hangman");
      }

      //Theme color update
      if(e.data.split("_")[0] == 'setThemeColor') {
        SetThemeColor(e.data.split("_")[1], e.data.split("_")[2], e.data.split("_")[3])
      }
      //setRoundedBorders_
      if(e.data.split("_")[0] == 'setRoundedBorders') {
        setRoundedBorders(e.data.split("_")[1]);
        document.documentElement.style.setProperty("--border-radius", (parseInt(localStorage.getItem("theme_rounded") * 8 ) + "px"));
        document.documentElement.style.setProperty("--inner-radius", (parseInt(localStorage.getItem("theme_rounded") * 4 ) + "px"));
      }

      if(e.data.split("_")[0] == 'setWiderBorders') {
        setWiderBorders(e.data.split("_")[1]);
        document.documentElement.style.setProperty("--border-width", (parseInt(localStorage.getItem("theme_wider")  )+ 1 + "px"));
      }
      if(e.data.split("_")[0] == 'setBlurBack') {
        setBlurBack(e.data.split("_")[1]);
        document.documentElement.style.setProperty("--blur-level", (parseInt(localStorage.getItem("theme_blur")  )*2 + "em"));
        
      }
      if(e.data == 'changelogs_readed') {
        var element = document.getElementById("changelogs_badge")
        if(element != null) {
          element.remove();
        }
      }
    }
};