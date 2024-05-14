
updateSelectedColor();
updateCheckbox();

function updateTheme(element) {
   var colorCode = window.getComputedStyle(element, null).getPropertyValue('background-color').replace("rgb(", "").replace(")","");
   colorCode = colorCode.replace(" ","").replace(" ","").replace(",","_").replace(",","_");
   window.top.postMessage('setThemeColor_' + colorCode, '*');
}

function updateCorners(element) {
   window.top.postMessage('setRoundedBorders_' + element.checked, '*');
}

function updateBorders(element) {
   window.top.postMessage('setWiderBorders_' + element.checked, '*');
}
function updateBlur(element) {
   window.top.postMessage('setBlurBack_' + element.checked, '*')//blurback
}

function updateWallpaper(element) {
   var folderName = element.children[1].innerHTML;
   for (const child of  element.children) {
      for (const subchild of  child.children) {
         if(subchild.classList.contains("wallpaper_name")) {
            folderName = subchild.innerHTML;
            break;
         }
      }
      if(child.classList.contains("wallpaper_name")) {
         folderName = child.innerHTML;
         break;
      }
   }
   folderName = folderName.toLowerCase();
   folderName = folderName.replace(" ", "")
   window.top.postMessage('setWallpaper_' + folderName, '*');
}

function updateSelectedColor() {
   document.documentElement.style.setProperty("--main-color", "rgb("+localStorage.getItem("theme_color")+")")
   document.documentElement.style.setProperty("--glass-color-hover", "rgba("+localStorage.getItem("theme_color")+", 0.3)")
   var colorButtons = document.getElementById("ColorsList").children;
   var found = false;
   for(var i = 0; i < colorButtons.length; i++) {
      var elemColor = window.getComputedStyle(colorButtons[i], null).getPropertyValue('background-color').replace("rgb(", "").replace(")","");
      elemColor = elemColor.replace(" ","").replace(" ","");
      if(elemColor == localStorage.getItem("theme_color")) {
         found = true;
         colorButtons[i].innerHTML = "";
         colorButtons[i].classList.add("currentColor");
         var checkbox = document.createElement("div");
         var checkbox_icon = document.createElement("img");
         checkbox_icon.src = "resources/checkbox.png"
         checkbox.appendChild(checkbox_icon);
         colorButtons[i].appendChild(checkbox);
      } else {
         colorButtons[i].classList.remove("currentColor");
         colorButtons[i].innerHTML = "";
      }
   }
}

function updateCheckbox() {
   if(localStorage.getItem("theme_rounded") == "2") {
      document.getElementById("roundedCorners").checked = true;
   } else {
      document.getElementById("roundedCorners").checked = false;
   }
   document.documentElement.style.setProperty("--border-radius", (parseInt(localStorage.getItem("theme_rounded") * 8 ) + "px"));
   document.documentElement.style.setProperty("--inner-radius", (parseInt(localStorage.getItem("theme_rounded") * 4 ) + "px"));//theme_wider
   if(localStorage.getItem("theme_wider") == "1.5") {
      document.getElementById("widerCorners").checked = true;
   } else {
      document.getElementById("widerCorners").checked = false;
   }
   document.documentElement.style.setProperty("--border-width", (parseInt(localStorage.getItem("theme_wider")  )+ 1 + "px"));
   if(localStorage.getItem("theme_blur") == "1") {
      document.getElementById("blurback").checked = true;
   } else {
      document.getElementById("blurback").checked = false;
   }
   document.documentElement.style.setProperty("--blur-level", (parseInt(localStorage.getItem("theme_blur")  )*2 + "em"));
}

window.onmessage = function(e) {
   if (e.data == 'settings_updated') {
     setTimeout(() => {
      updateSelectedColor();
      updateCheckbox();
     }, 100);
   }
 };