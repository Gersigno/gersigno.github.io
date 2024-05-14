/**
 * This class create a new popuo on our UI.
 * @param {string} icon ***String***>[*not required*], The relative path of the icon.
 * @param {string} title ***String***, This text will be shown as the shortcut's title.
 * @param {string} message ***String***, The message of the popup.
 * @param {string} okText ***String***>[*not required*], text of the main button
 * @param {()=>funcPtr} okFunction ***function***, The function to execute when the main button is clicked **(exemple: ()=>MyFunction())**.
 * @param {string} cancelText ***String***>[*not required*], text of the secondary button
 * @param {()=>funcPtr} cancelFunction ***function***, The function to execute when the secondary button is clicked **(exemple: ()=>MyFunction())**.
 */
class Popup {
  constructor(
    icon = "resources/desktop/icons/exe.png",
    title,
    message,
    okText = "Ok",
    okFunction = undefined,
    cancelText = undefined,
    cancelFunction = undefined
  ) {
    if (currentPopup == undefined || currentPopup == null) {
      //If our UI doesn't contain a popup already, we can create one.
      this.icon = icon; //not required parameter, will be "exe.png" if undefinied.
      this.title = title;
      this.message = message;
      this.okText = okText; //not required parameter, will be set to "Ok" by default.
      this.okFunction = okFunction; //not required parameter, will no create the OK button if undefinied.
      this.cancelText = cancelText; //not required parameter, will no create the Cancel button if undefinied.
      this.cancelFunction = cancelFunction; //not required parameter, will no create the Cancel button if undefinied.
      this.createPopup(this.okFunction, this.cancelFunction);
    }
  }
  /**
   * This function create the popup element in our UI and fill the "currentPopup" variable.
   * @param {*} OKFunction The function to call when the "OK" button is clicked.
   * @param {*} CancelFunction The function to call when the "Cancel" button is clicked.
   */
  createPopup(OKFunction, CancelFunction) {
    document.body
      .appendChild(
        Object.assign(document.createElement("div"), { id: "popup_background" })
      )
      .appendChild(
        Object.assign(document.createElement("div"), {
          id: "popup",
          className: "background_blur"
        })
      );
    const POPUP = document.getElementById("popup");
    POPUP.appendChild(
      Object.assign(document.createElement("div"), {
        id: "popup_title_layer",
      })
    );
    const POPUP_TITLE_LAYER = document.getElementById("popup_title_layer");
    POPUP_TITLE_LAYER.appendChild(
      Object.assign(document.createElement("img"), {
        id: "popup_icon",
        src: this.icon,
      })
    );
    POPUP_TITLE_LAYER.appendChild(
      Object.assign(document.createElement("h4"), {
        id: "popup_title",
        innerHTML: this.title,
      })
    );

    POPUP.appendChild(
      Object.assign(document.createElement("div"), {
        id: "popup_description",
        innerHTML: this.message,
      })
    );

    POPUP.appendChild(
      Object.assign(document.createElement("div"), { id: "buttons_layer" })
    );
    const BTN_LAYER = document.getElementById("buttons_layer");
    BTN_LAYER.appendChild(
      Object.assign(document.createElement("button"), {
        id: "ok_button",
      })
    ).appendChild(
      Object.assign(document.createElement("div"), {
        innerHTML: this.okText,
        id: "ok_button_text",
      })
    );

    BTN_LAYER.appendChild(
      Object.assign(document.createElement("button"), {
        id: "cancel_button",
      })
    ).appendChild(
      Object.assign(document.createElement("div"), {
        innerHTML: this.cancelText,
        id: "cancel_button_text",
      })
    );

    const BTN_OK = document.getElementById("ok_button");
    const BTN_CANCEL = document.getElementById("cancel_button");

    BTN_OK.addEventListener("click", () => {
      if (typeof OKFunction === "function") {
        OKFunction();
      }
      this.destroyPopup();
    });
    BTN_CANCEL.addEventListener("click", () => {
      if (typeof CancelFunction === "function") {
        CancelFunction();
      }
      this.destroyPopup();
    });
    if (this.cancelText == null || this.cancelText == undefined) {
      BTN_CANCEL.remove();
    }
    POPUP.classList.add("open_popup");
    if(localStorage.getItem("theme_blur") == "0") {
      console.log("aaaaaaaaaa")
      POPUP.classList.add("popup_opaque");
    } else {
      POPUP.classList.add("popup_blur");
    }
    currentPopup = this;
  }

  /**
   * This function removes the popup of the UI and clear the "currentPopup" variable to let our system create a new one if needed.
   */
  destroyPopup() {
    const POPUP = document.getElementById("popup_background");
    POPUP.classList.remove("open_popup");
    POPUP.classList.add("close_popup");
    setTimeout(function timer() {
      POPUP.remove();
      currentPopup = null;
    }, 500);
  }
}

/**
 * This class create a new window that can hold custom content.
 * @param {string} icon ***String***>, The relative path of the icon.
 * @param {string} title ***String***, This text will be shown inside of our window's header
 * @param {string} content ***String***, relative path of your html page that will be shown in our window's as its content
 * @param {string} whandler ***String***>, THIS NEED TO BE A UNIQUE ID.
 */
class Window {
  constructor(
    icon = "resources/desktop/icons/exe.png",
    title = "Undefinied window",
    content = "_subpages\\blank\\index.html",
    whandler = "default_handler"
  ) {
    this.icon = icon;
    this.title = title;
    this.content = content;
    this.whandler = whandler;
    this.iframe;
    this.windowedLastPosition = [0,0];
    this.maximized = false;
    this.createWindow();
  }
  /**
   * This fonction create our window and bring it to our screen.
   */
  createWindow() {
    if (!this._CheckForOpenedWindow(this.whandler)) {
      //First, push our new window's handler inside our opened_windows array.
      opened_windows.push(this);

      //then, i create my window's main div with our handler as ID.
      document.body.appendChild(
        Object.assign(document.createElement("div"), {
          id: this.whandler,
          className: "window_container background_blur",
        })
      );

      const WINDOW = document.getElementById(this.whandler);
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      const SpawnPercentage = 25;
      var newTop;
      var newLeft;
      var deviceType = 0;
      if(vw < 960 && vw > 500) {
        //tablet
        newTop = 45;
        newLeft = 5;
        deviceType = 1;
      } 
      if(vw < 500) {
        //phone
        newTop = 5;
        newLeft = 5;
        deviceType = 2;
      } 
      if(vw > 960) {
        //computer
        newTop = ((vh * SpawnPercentage)/100) + (opened_windows.length * 20);
        newLeft = ((vw * SpawnPercentage)/100) + (opened_windows.length * 20);
      }
      
      WINDOW.style.top = newTop + "px";
      WINDOW.style.left = newLeft + "px"

      //create our window's header
      WINDOW.appendChild(
        Object.assign(document.createElement("div"), {
          id: this.whandler + "_head",
          className: "window_head",
        })
      );

      const WINDOW_HEAD = document.getElementById(this.whandler + "_head");
      WINDOW_HEAD.appendChild(
        Object.assign(document.createElement("div"), {
          id: this.whandler + "_head_contaier",
          className: "window_head_container",
        })
      );
      WINDOW_HEAD.appendChild(
        Object.assign(document.createElement("div"), {
          id: this.whandler + "_head__buttons_contaier",
          className: "window_head_buttons_container",
        })
      );
      const WINDOW_HEAD_BTN_HOST = document.getElementById(this.whandler + "_head__buttons_contaier");
      if(deviceType != 2) {
        WINDOW_HEAD_BTN_HOST.appendChild(
          Object.assign(document.createElement("button"), {
            id: this.whandler + "_min_button",
            innerHTML: "_",
            className: "window_btn window_min_btn",
          })
        );
      }
      
      if(deviceType == 0) {
        WINDOW_HEAD_BTN_HOST.appendChild(
          Object.assign(document.createElement("button"), {
            id: this.whandler + "_max_button",
            innerHTML: "▭",
            className: "window_btn window_max_btn",
          })
        );
      }
      WINDOW_HEAD_BTN_HOST.appendChild(
        Object.assign(document.createElement("button"), {
          id: this.whandler + "_close_button",
          innerHTML: "X",
          className: "window_btn window_close_btn",
        })
      );

      const CLOSE_BUTTON = document.getElementById(
        this.whandler + "_close_button"
      );
      CLOSE_BUTTON.addEventListener("click", () => {
        this.closeWindow(this.whandler);
      });
      if(deviceType == 0) {
        const MAX_BUTTON = document.getElementById(
          this.whandler + "_max_button"
        );
        MAX_BUTTON.addEventListener("click", () => {
          this.maxWindow(this.whandler);
        });
      }
      if(deviceType != 2) {
        const MIN_BUTTON = document.getElementById(
          this.whandler + "_min_button"
        );
        MIN_BUTTON.addEventListener("click", () => {
          this.minWindow(this.whandler);
        });
      }
      
      
      

      const WINDOW_HEAD_CONTAINER = document.getElementById(
        this.whandler + "_head_contaier"
      );
      WINDOW_HEAD_CONTAINER.appendChild(
        Object.assign(document.createElement("img"), {
          id: this.whandler + "_icon",
          src: this.icon,
          className: "window_icon",
        })
      );
      WINDOW_HEAD_CONTAINER.appendChild(
        Object.assign(document.createElement("h4"), {
          id: this.whandler + "_title",
          innerHTML: this.title,
          className: "window_title",
        })
      );

      //Create our window's body
      WINDOW.appendChild(
        Object.assign(document.createElement("div"), {
          id: this.whandler + "_body",
          className: "window_body",
        })
      );
      //Bring our window's foreground on any click events.
      WINDOW.addEventListener("click", () => {
        this.BringToFront(WINDOW);
      });

      //Create our window's content (iframe)
      const CONTENT = document.getElementById(this.whandler + "_body");
      CONTENT.appendChild(
        Object.assign(document.createElement("iframe"), {
          id: this.whandler + "_content",
          className: "window_content",
          src: this.content,
        })
      );

      var CONTENT_FRAME = document.getElementById(this.whandler + "_content");
      CONTENT_FRAME.type = "text/html";
      this.iframe = CONTENT_FRAME;
      WINDOW.classList.add("window_open");

      var taskbar = document.getElementById("taskbar_apps");
      var newIcon = document.createElement("button");
      newIcon.className = "taskbar_button";
      newIcon.classList.add("taskbar_iconIn");
      newIcon.classList.add("taskbar_app");
      newIcon.id = "taskbaricon_" + this.whandler;
      //document.getElementById("taskbaricon_" + focused_window).classList.add("taskbar_iconactive");
      newIcon.appendChild(
        Object.assign(document.createElement("img"), {
          src: this.icon,
          className: "taskbar_button_icon"
        })
      );
      newIcon.onclick = function () {
        for(var i = 0; i < opened_windows.length; i++) {
          if(opened_windows[i].whandler == this.id.replace("taskbaricon_","")) {
            //if we found our window's object inside our opened_windows array, we bring it in front of the others.
            opened_windows[i].BringToFront(document.getElementById(this.id.replace("taskbaricon_","")));
            document.getElementById(this.id.replace("taskbaricon_","")).classList.remove("window_minimized");
            break;
          }
        }
      }

      taskbar.appendChild(newIcon);

      WINDOW.appendChild(
        Object.assign(document.createElement("div"), {
          id: this.whandler + "_focus_overlay",
          className: "window_focusBorders",
        })
      );

      this.BringToFront(WINDOW);

      

      } else {
        //This window already exists in our desktop, bringing it to the front.
        const WINDOW = document.getElementById(this.whandler);
        this.BringToFront(WINDOW);
        WINDOW.classList.remove("window_minimized");
      }

      const WINDOW = document.getElementById(this.whandler);
      const WINDOW_HEAD = document.getElementById(this.whandler + "_head");
      var isMouseDown = false;
      WINDOW_HEAD.onmousedown = () => {
        if(MovingWindow == "") {
          isMouseDown = true;
          this.BringToFront(WINDOW);
          this.MoveWindow(WINDOW);
        }
      }
      WINDOW_HEAD.onmouseup = () => {
        isMouseDown = false;
        this.MoveWindowStop();
      }
      WINDOW_HEAD.onmouseleave = () => {
        if(isMouseDown == false && MovingWindow != "" && MovingWindow == WINDOW) {
          this.MoveWindowStop();
        }
      }
  }

  /**
   * Check if the target window already exists in our desktop
   * @param {*} whandler target window's handler
   * @returns true if found, false if not.
   */
  _CheckForOpenedWindow(whandler) {
    var found = false;
    for (var i = 0; i < opened_windows.length; i++) {
      if (opened_windows[i].whandler == whandler) {
        found = true;
        break;
      }
    }
    return found;
  }

  /**
   * This function destroy the target window
   * @param {*} Target target window's whandler
   */
  closeWindow(Target) {
    for(var i = 0; i < opened_windows.length; i++) {
      if(opened_windows[i].whandler == Target) {
        opened_windows.splice(i, 1);
      }
    }
    const WINDOW = document.getElementById(Target);
    WINDOW.classList.remove("window_open");
    WINDOW.classList.add("window_close");
    const TASK_ICON = document.getElementById("taskbaricon_" + this.whandler);
    TASK_ICON.classList.remove("taskbar_iconIn");
    TASK_ICON.classList.add("taskbar_iconOut");
    setTimeout(function timer() {
      WINDOW.remove();
      TASK_ICON.remove();
    }, 500);
  }

  maxWindow(Target) {
    const TASKBAR_SIZE = 39;
    const SCREEN_BORDER_PADDING = 4;
    const WINDOW = document.getElementById(Target);
    for(var i = 0; i < opened_windows.length; i++) {
      if(opened_windows[i].whandler == Target) {
        if(opened_windows[i].maximized == false) {
          opened_windows[i].windowedLastPosition[0] = WINDOW.style.left;
          opened_windows[i].windowedLastPosition[1] = WINDOW.style.top;
          MovingWindow = "";
          WINDOW.classList.add("window_maximized");
          opened_windows[i].maximized = true;
          WINDOW.style.left = SCREEN_BORDER_PADDING + "px";
          WINDOW.style.top = + TASKBAR_SIZE + SCREEN_BORDER_PADDING + "px";
        } else {
          //go default size
          MovingWindow = "";
          WINDOW.classList.remove("window_maximized");
          opened_windows[i].maximized = false;
          WINDOW.style.left = opened_windows[i].windowedLastPosition[0];
          WINDOW.style.top = opened_windows[i].windowedLastPosition[1];
        }
      }
    }
  }

  minWindow(Target) {
    const WINDOW = document.getElementById(Target);
    WINDOW.classList.add("window_minimized");
  }

  /**
   * This function bring the target window in front of the others
   * @param {*} Target
   */
  BringToFront(Target) {
    const OTHER_WINDOWS = document.getElementsByClassName("window_container");
    for (var i = 0; i < OTHER_WINDOWS.length; i++) {
      OTHER_WINDOWS[i].style.zIndex = OTHER_WINDOWS[i].style.zIndex - 1;
      OTHER_WINDOWS[i].classList.remove("window_infront");
      OTHER_WINDOWS[i].classList.remove("window_focused");
      OTHER_WINDOWS[i].classList.add("window_not_infront");
      document.getElementById(OTHER_WINDOWS[i].id + "_focus_overlay").classList.remove("window_focusBorders");
    }
    Target.style.zIndex = 100 + opened_windows.length;
    
    if(localStorage.getItem("theme_blur") == "1") {
      Target.classList.remove("window_not_infront");
      Target.classList.add("window_infront");
    }
    Target.classList.add("window_focused");

    
    focused_window = Target.id;
    document.getElementById(Target.id + "_focus_overlay").classList.add("window_focusBorders");
    document.getElementById(Target.id + "_focus_overlay").zIndex = 100 + opened_windows.length + 1;

    const TASK_BAR = document.getElementById("taskbar_apps").children;
    for(var i = 1; i < TASK_BAR.length; i++) {
      var elem = document.getElementById(TASK_BAR[i].id)
      elem.classList.remove("taskbar_iconactive");
    }
    document.getElementById("taskbaricon_" + focused_window).classList.add("taskbar_iconactive");
  }

  /**
   * This function is called on mouse up & on mouse leave events
   */
  MoveWindowStop() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    if(vw > 960) {
      const WINDOW = document.getElementById(MovingWindow);
      WINDOW.style.transitionDuration = "200ms;"
      const WINDOW_CONTENT = document.getElementById(MovingWindow + "_content");
      WINDOW_CONTENT.style.pointerEvents = "all"
      MovingWindow = "";
    }
    
  }

  /**
   * This function is called on mouse down events on this window's head.
   * @param {*} Target moving window's whandler
   */
  MoveWindow(Target) {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    MovingWindow = Target.id;
    const WINDOW = document.getElementById(MovingWindow);
    if(vw > 960 && !WINDOW.classList.contains("window_maximized")) {
      StartMousePos = mousePos;
      const WINDOW_CONTENT = document.getElementById(MovingWindow + "_content");
      WINDOW.style.transitionDuration = "0ms;"
      WINDOW_CONTENT.style.pointerEvents = "none"
      StartWinPos = {x: WINDOW.style.left, y: WINDOW.style.top};
      StartWinPos.x = parseFloat(StartWinPos.x.toString().replace("px",""));
      StartWinPos.y = parseFloat(StartWinPos.y.toString().replace("px",""));
    }

  }
}


/**
 * This class create a tiny toast notification at the bottom center of our screen.
 * @param {string} icon ***String***>, The relative path of the icon.
 * @param {string} title ***String***, This text will be shown inside of our window's header
 * @param {string} Description ***String***, The secondary text of the notification.
 */
class ToastNotify {
  constructor(icon = undefined, title, description = undefined) {
    this.icon = icon;
    this.title = title;
    this.description = description;
    this.createToast();
  }
  createToast() {
    var existingToasts = document.getElementsByClassName("toast");
    for(var i = 0; i < existingToasts.length; i++) {
      existingToasts[i].remove();
    }
    var toastNotification = document.createElement("button");
    toastNotification.className = "toast";
    toastNotification.classList.add("open_toast");
    toastNotification.addEventListener("click", () => {
      if(toastNotification.classList.contains("open_toast")) {
        toastNotification.classList.remove("open_toast");
        toastNotification.classList.add("close_toast");
      }
    });
    
    if(this.icon != undefined) {
      toastNotification.appendChild(
        Object.assign(document.createElement("img"), {
          src: this.icon,
        })
      );
    }
    

    var toastContent = document.createElement("div");
    toastContent.appendChild(
      Object.assign(document.createElement("h4"), {
        innerText: this.title,
      })
    );
    if(this.description != undefined) {
      toastContent.appendChild(
        Object.assign(document.createElement("h5"), {
          innerText: this.description,
        })
      );
    }

    toastNotification.appendChild(toastContent);
    document.body.appendChild(toastNotification);

    setTimeout(() => {
      if(toastNotification.classList.contains("open_toast")) {
        toastNotification.classList.remove("open_toast");
        toastNotification.classList.add("close_toast");
      }
      
    }, 5000);
  }
}