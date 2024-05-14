class Settings {
    constructor() {
        //this.language = this.getSetting("language");
        this.themeColor = this.getSetting("theme_color");
        this.roundedBorder = this.getSetting("theme_rounded");
        this.widerBorder = this.getSetting("theme_wider");//theme_wider
        this.useBlur = this.getSetting("theme_blur");
        this.wallpaper = this.getSetting("theme_wallpaper");
        this.InitSettings();
    }
    InitSettings() {
        //First, check if our setting's items are existing inside our local storage, if not, we create them with an default value
        if(this.themeColor == null) {
            //setting item doesn't exist in our localStorage, setting it up...
            var tempColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color').replace("rgba(", "").replace(")","").split(",");
            var fullColor = parseFloat(tempColor[0]) + "," + parseFloat(tempColor[1]) + "," + parseFloat(tempColor[2]);
            localStorage.setItem("theme_color", fullColor);
            this.themeColor = this.getSetting("theme_color");
        }
        if(this.roundedBorder == null) {
            localStorage.setItem("theme_rounded", "2");
        }
        if(this.roundedBorder == null) {
            localStorage.setItem("theme_wider", "0");
        }
        if(this.useBlur == null) {
            localStorage.setItem("theme_blur", "1");
        }
        if(this.wallpaper == null) {
            localStorage.setItem("theme_wallpaper", "default");
        }
        //Then, load all our settings from local storage.
        var color = this.themeColor.split(",");
        SetThemeColor(color[0], color[1], color[2])

        document.documentElement.style.setProperty("--border-radius", (parseInt(localStorage.getItem("theme_rounded") * 8 ) + "px"));
        document.documentElement.style.setProperty("--inner-radius", (parseInt((localStorage.getItem("theme_rounded") * 8 ) - 2) + "px"));

        document.documentElement.style.setProperty("--border-width", (parseInt(localStorage.getItem("theme_wider")  )+ 1 + "px"));
        document.documentElement.style.setProperty("--blur-level", (parseInt(localStorage.getItem("theme_blur")  )*2 + "em"));

        setWallpaper(localStorage.getItem("theme_wallpaper"))

        SETTINGS_UPDATED();
    }
    getSetting(setting) {
        return localStorage.getItem(setting)
    }
}
