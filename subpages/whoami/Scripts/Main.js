updateFromSettings();
function EventBegin() {
    timeElapsedCalc();
}

function timeElapsedCalc() {
    let startTime = new Date("10/10/2000 4:10:47");
    let nowTime = Date.now()
    let timeElapsed = Date.now() - startTime.getTime();


    var ms = timeElapsed;
    var dateFormat = "Y-m-d-H-i-s-v";
    var formatted = format(ms, dateFormat);
    let fixedYears = "" + formatted;
    var TimesArray = fixedYears.split("-");

    document.getElementById("TimeAlive_Y").innerHTML = TimesArray[0];
    document.getElementById("TimeAlive_M").innerHTML = TimesArray[1];
    document.getElementById("TimeAlive_D").innerHTML = TimesArray[2];
    document.getElementById("TimeAlive_h").innerHTML = TimesArray[3];
    document.getElementById("TimeAlive_m").innerHTML = TimesArray[4];
    document.getElementById("TimeAlive_s").innerHTML = TimesArray[5];
    document.getElementById("TimeAlive_ms").innerHTML = TimesArray[6];
    setTimeout(timeElapsedCalc, 100);
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
    return (date instanceof Date);
  }
  
  function format(date, format) {
    var d = toDate(date);
  
    return format
      .replace(/Y/gm, (d.getFullYear()-1970).toString())
      .replace(/m/gm, ('0' + (d.getMonth() + 1)).substr(-2))
      .replace(/d/gm, ('0' + (d.getDate() + 0)).substr(-2))
      .replace(/H/gm, ('0' + (d.getHours() + 0)).substr(-2))
      .replace(/i/gm, ('0' + (d.getMinutes() + 0)).substr(-2))
      .replace(/s/gm, ('0' + (d.getSeconds() + 0)).substr(-2))
      .replace(/v/gm, ('0000' + (d.getMilliseconds() % 1000)).substr(-3));
  }


  window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    var NewOpacity;
    if(scroll <= 80) {
      NewOpacity = ( 1 - (scroll/80));
      document.getElementById("ScrollId").style.opacity = NewOpacity;
    } else {
      NewOpacity = 0;
      document.getElementById("ScrollId").style.visibility = "collapse";
    }
});


window.onmessage = function(e) {
  if (e.data == 'settings_updated') {
    setTimeout(() => {
      updateFromSettings();
    }, 100);
  }
};

function updateFromSettings() {
  document.documentElement.style.setProperty("--theme-color", "rgb("+localStorage.getItem("theme_color")+")")
}