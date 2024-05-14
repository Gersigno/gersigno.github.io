var settings = new Settings();

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function SetThemeColor(new_r, new_g, new_b) {
  var ColorValue = "" + new_r + "," + new_g + "," + new_b + "";
  var RebuildedColor = "rgba(" + ColorValue + ", 1)";

  document.documentElement.style.setProperty("--main-color", RebuildedColor);

  var RebuildedColorTrp = "rgba(" + ColorValue + ", 0.15)";
  document.documentElement.style.setProperty(
    "--main-color-transparant",
    RebuildedColorTrp
  );
  var RebuildedColorShadow = "rgba(" + ColorValue + ", 0.45)";
  document.documentElement.style.setProperty(
    "--main-color-shadow",
    RebuildedColorShadow
  );

  var RebuildedColorHover = "rgba(" + ColorValue + ", 0.3)";
  document.documentElement.style.setProperty(
    "--glass-color-hover",
    RebuildedColorHover
  );

  var DarkerColorBaseR = parseFloat(ColorValue);
  var DarkerColorBaseG = parseFloat(
    ColorValue.replace(DarkerColorBaseR + ",", "")
  );
  var DarkerColorBaseB = parseFloat(
    ColorValue.replace(DarkerColorBaseR + ",", "").replace(
      DarkerColorBaseG + ",",
      ""
    )
  );
  var RebuildedColorBackground =
    "rgba(" +
    DarkerColorBaseR / 2 +
    ", " +
    DarkerColorBaseG / 2 +
    ", " +
    DarkerColorBaseB / 2 +
    ", 1)";
  document.documentElement.style.setProperty(
    "--background-dark",
    RebuildedColorBackground
  );

  var startColor = rgbToHex(
    DarkerColorBaseR,
    DarkerColorBaseG,
    DarkerColorBaseB
  );
  var stopColor = rgbToHex(
    Math.floor(DarkerColorBaseR / 2),
    Math.floor(DarkerColorBaseG / 2),
    Math.floor(DarkerColorBaseB / 2)
  );

  
    localStorage.setItem("theme_color", ColorValue);
  SETTINGS_UPDATED();
}

/**
 * This function is called everytime a setting is updated,
 * it send a message notify to every windows opened.
 */
function SETTINGS_UPDATED() {
  for(var i = 0; i < opened_windows.length; i++) {
    opened_windows[i].iframe.contentWindow.postMessage('settings_updated', '*');
  }
  document.getElementById("wallpaperFrame").contentWindow.postMessage('settings_updated', '*');
  //new ToastNotify("resources/desktop/icons/settings.png", "Settings", "✅ settings updated & saved !")
}


function setRoundedBorders(value) {
  var num;
  if(value == "true") {
    num = 2;
  } else {
    num = 0;
  }
  localStorage.setItem("theme_rounded", num.toString());
  SETTINGS_UPDATED();
}

function setWiderBorders(value) {
  var num;
  if(value == "true") {
    num = 1.5;
  } else {
    num = 0;
  }
  localStorage.setItem("theme_wider", num.toString());
  SETTINGS_UPDATED();
}

function setBlurBack(value) {
  var num;
  if(value == "true") {
    num = 1;
  } else {
    num = 0;
  }
  localStorage.setItem("theme_blur", num.toString());

  if(localStorage.getItem("theme_blur") == "1") {
    for(var i = 0; i < opened_windows.length; i++) {
      if(opened_windows[i].whandler == focused_window) {
        opened_windows[i].BringToFront(document.getElementById(opened_windows[i].whandler));
      }
    }
  } else {
    for(var i = 0; i < opened_windows.length; i++) {
      document.getElementById(opened_windows[i].whandler).classList.remove("window_infront");
      document.getElementById(opened_windows[i].whandler).classList.add("window_not_infront");
    }
  }
  SETTINGS_UPDATED();
}

function setWallpaper(newWallpaper) {
  localStorage.setItem("theme_wallpaper", newWallpaper);

  document.getElementById("wallpaperFrame").src = "wallpapers\\" + newWallpaper + "\\wallpaper.html";
  SETTINGS_UPDATED();
}
