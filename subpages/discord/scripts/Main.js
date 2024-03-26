function EventBegin() {
    
}
function JoinDiscord() {
  window.open("https://discord.gg/KvgNyuJpKz");
}

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
}

updateFromSettings();