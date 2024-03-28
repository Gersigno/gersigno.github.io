updateFromSettings();

window.onmessage = function(e) {
    if (e.data == 'settings_updated') {
      setTimeout(() => {
        updateFromSettings();
      }, 100);
    }
  };
  
function updateFromSettings() {
    document.documentElement.style.setProperty("--border-radius", (parseInt(localStorage.getItem("theme_rounded") * 8 ) + "px"));
    document.documentElement.style.setProperty("--inner-radius", (parseInt(localStorage.getItem("theme_rounded") * 4 ) + "px"));
    document.documentElement.style.setProperty("--border-width", (parseInt(localStorage.getItem("theme_wider")  )+ 1 + "px"));
    document.documentElement.style.setProperty("--blur-level", (parseInt(localStorage.getItem("theme_blur")  )*2 + "em"));
    document.documentElement.style.setProperty("--glass-color-hover", "rgba("+localStorage.getItem("theme_color")+",0.3)")
    document.documentElement.style.setProperty("--main-color-transparant", "rgba("+localStorage.getItem("theme_color")+",0.15)")
}

//changelogs_readed
window.top.postMessage('changelogs_readed', '*');