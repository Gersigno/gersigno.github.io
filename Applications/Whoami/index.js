let startTime = new Date("10/10/2000 4:10:47");
let age_text;
window.addEventListener("load", (event) => {
    age_text = document.getElementById("current_age");
    timeElapsedCalc();
})

function timeElapsedCalc() {
    
    let nowTime = Date.now()
    let timeElapsed = nowTime - startTime.getTime();


    var ms = timeElapsed;
    var dateFormat = "Y-m-d-H-i-s-v";
    var formatted = format(ms, dateFormat);
    let fixedYears = "" + formatted;
    var TimesArray = fixedYears.split("-");

    age_text.innerHTML = "I'm a <b>" + TimesArray[0] + "</b> Years <b>" + TimesArray[1] + "</b> Months <b>" + TimesArray[2] + "</b> Days <b>" + TimesArray[3] + "</b> Hours <b>" + TimesArray[4] + "</b> Minutes <b>" + TimesArray[5] + "</b> Seconds and <b>" + TimesArray[6] + "</b> Milliseconds old !";

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
        .replace(/Y/gm, (d.getFullYear() - 1970).toString())
        .replace(/m/gm, ('0' + (d.getMonth() + 1)).substr(-2))
        .replace(/d/gm, ('0' + (d.getDate() + 0)).substr(-2))
        .replace(/H/gm, ('0' + (d.getHours() + 0)).substr(-2))
        .replace(/i/gm, ('0' + (d.getMinutes() + 0)).substr(-2))
        .replace(/s/gm, ('0' + (d.getSeconds() + 0)).substr(-2))
        .replace(/v/gm, ('0000' + (d.getMilliseconds() % 1000)).substr(-3));
}