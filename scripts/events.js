let mousePos = { x: undefined, y: undefined }; //This variable will store the cursor's position in our viewport.

//These values are used when our user start moving a window.
var StartMousePos = { x: undefined, y: undefined };
var StartWinPos = { x: undefined, y: undefined };

/**
 * Mouse moving events
 */
window.addEventListener("mousemove", (event) => {
  //Set the current cursor position to the mousePos variable
  mousePos = { x: event.clientX, y: event.clientY };
  if (MovingWindow != null && MovingWindow != undefined && MovingWindow != "") {
    //If our user is moving a window, we update the position.
    const TASKBAR_SIZE = 39;
    const SCREEN_BORDER_PADDING = 4;
    var MyWindow = document.getElementById(MovingWindow);
    var MyWindowContainer = document.getElementById(MovingWindow);

    var Diff = { x: undefined, y: undefined };
    Diff.x = mousePos.x - (StartMousePos.x - StartWinPos.x);
    Diff.y = mousePos.y - (StartMousePos.y - StartWinPos.y);

    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );

    if (Diff.x < SCREEN_BORDER_PADDING) {
      Diff.x = SCREEN_BORDER_PADDING;
    }
    if (Diff.x + MyWindow.style.width > vw) {
      Diff.x = vw + MyWindow.style.width;
    }
    if (Diff.y < 0 + TASKBAR_SIZE + SCREEN_BORDER_PADDING) {
      Diff.y = 0 + TASKBAR_SIZE + SCREEN_BORDER_PADDING;
    }
    if (Diff.y > vh - MyWindow.style.height) {
      Diff.y = vh - MyWindow.style.height;
    }

    MyWindow.style.left = Diff.x + "px";
    MyWindow.style.top = Diff.y + "px";
  }
});

/**
 * Track any clicks events on any windows to change our focus.
 *! probably a terrible way to find focused iframe, need some changes later !!
 */
let interval = window.setInterval(trackClick, 100);
function trackClick() {
  if(document.activeElement.className=="window_content" && document.getElementById(document.activeElement.id).parentElement.parentElement.id != focused_window) {
    //If the focused window is not the same as the clicked window, we try to obtain the object of the clicked window to call its 'BringToFront' function.
    for(var i = 0; i < opened_windows.length; i++) {
      if(opened_windows[i].whandler == document.getElementById(document.activeElement.id).parentElement.parentElement.id) {
        //if we found our window's object inside our opened_windows array, we bring it in front of the others.
        opened_windows[i].BringToFront(document.getElementById(document.activeElement.id).parentElement.parentElement);
        //console.log("App started, focus: " + focused_window + " | ", document.activeElement);
        break;
      }
    }
  }
}

function Event_BetaPopup() {
  UI_CreatePupup("resources/desktop/icons/infos.png","Beta", "This portfolio is still in beta, some features may not work as intended.\rBe sure to come back later or to follow the github repo to check for any new updates !", "Follow the GitHub repo",()=>window.open('https:\/\/github.com\/Gersigno\/gersigno.github.io', '_blank').focus(), "Understand")
}