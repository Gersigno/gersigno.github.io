updateFromSettings();
window.onmessage = function(e) {
    if (e.data == 'settings_updated') {
      setTimeout(() => {
        updateFromSettings();
      }, 100);
    }
  };
  
  function updateFromSettings() {
    var newColor = localStorage.getItem("theme_color").split(",");
    SetThemeColor(newColor[0],newColor[1],newColor[2])
  }

  
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
  
    var backgroundsvg =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='198'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='50%25' x2='50%25' y1='-10.959%25' y2='100%25'%3E%3Cstop stop-color='%23" +
      startColor +
      "' stop-opacity='.5' offset='0%25' class='back-start-color'/%3E%3Cstop stop-color='%23" +
      stopColor +
      "' offset='100%25' class='back-stop-color'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23a)' fill-rule='evenodd' d='M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z' transform='matrix(-1 0 0 1 1600 0)'/%3E%3C/svg%3E%0A";
    var logoSvg =
      "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0.00 0.00 794.00 337.00'%3E%3Cpath fill='%23" +
      startColor +
      "' d=' M 144.00 73.98 C 103.54 100.71 87.60 151.80 106.53 196.37 C 124.47 238.58 169.99 262.00 214.82 253.97 C 254.67 246.83 286.09 217.32 298.93 179.36 Q 299.16 178.68 299.17 179.40 Q 299.18 179.96 299.16 180.51 Q 298.56 198.31 291.45 214.87 C 266.95 271.94 201.94 296.67 144.57 275.16 C 94.43 256.36 61.87 204.52 67.15 150.29 C 71.77 102.83 103.24 62.76 149.16 48.28 C 179.46 38.73 214.14 43.28 240.21 61.49 Q 241.75 62.56 239.96 61.98 C 207.72 51.56 172.30 55.29 144.00 73.98 Z'%0A/%3E%3Cpath fill='%23" +
      startColor +
      "' d=' M 197.42 201.10 Q 193.77 199.57 191.41 198.10 Q 190.56 197.57 191.56 197.52 Q 210.59 196.43 224.65 194.68 Q 239.01 192.88 251.18 188.17 C 272.51 179.92 286.37 163.15 295.85 142.51 Q 296.30 141.51 296.45 142.60 Q 297.64 151.50 295.64 160.34 C 288.65 191.35 260.75 209.16 229.82 208.24 Q 213.19 207.75 197.42 201.10 Z'%0A/%3E%3Cpath fill='%23" +
      startColor +
      "' d=' M 393.22 266.37 A 10.05 10.05 0.0 0 1 383.17 276.42 A 10.05 10.05 0.0 0 1 373.12 266.37 A 10.05 10.05 0.0 0 1 383.17 256.32 A 10.05 10.05 0.0 0 1 393.22 266.37 Z M 390.62 266.44 A 7.46 7.46 0.0 0 0 383.16 258.98 A 7.46 7.46 0.0 0 0 375.70 266.44 A 7.46 7.46 0.0 0 0 383.16 273.90 A 7.46 7.46 0.0 0 0 390.62 266.44 Z'%0A/%3E%3Cpath fill='%23" +
      startColor +
      "' d=' M 466.74 267.77 C 466.67 276.04 477.98 276.30 477.77 267.02 Q 477.65 261.70 477.75 256.93 Q 477.77 256.24 478.46 256.24 L 479.53 256.25 Q 480.31 256.26 480.28 257.04 Q 480.15 261.25 480.32 265.95 Q 480.49 270.51 478.92 272.85 C 475.69 277.69 468.27 277.59 465.31 272.43 Q 463.87 269.92 464.00 266.04 Q 464.15 261.51 464.00 257.12 A 0.78 0.78 0.0 0 1 464.74 256.31 L 466.00 256.23 Q 466.73 256.19 466.74 256.93 Q 466.79 262.19 466.74 267.77 Z'%0A/%3E%3Cpath fill='%23" +
      startColor +
      "' d=' M 514.50 273.34 C 517.36 274.55 519.39 273.69 521.92 272.42 Q 522.52 272.12 522.91 272.66 Q 523.31 273.23 523.49 273.89 Q 523.63 274.47 523.11 274.75 Q 516.77 278.23 511.53 274.48 C 501.07 266.98 511.75 250.73 523.20 258.04 Q 523.78 258.41 523.44 259.02 L 522.93 259.91 A 0.77 0.77 0.0 0 1 521.83 260.17 C 512.50 253.90 504.49 269.10 514.50 273.34 Z'%0A/%3E%3Crect fill='%23" +
      startColor +
      "' x='589.88' y='256.28' width='2.80' height='19.48' rx='0.60'/%3E%3Cpath fill='%23" +
      startColor +
      "' d=' M 640.22 266.37 A 10.05 10.05 0.0 0 1 630.17 276.42 A 10.05 10.05 0.0 0 1 620.12 266.37 A 10.05 10.05 0.0 0 1 630.17 256.32 A 10.05 10.05 0.0 0 1 640.22 266.37 Z M 637.63 266.45 A 7.46 7.46 0.0 0 0 630.17 258.99 A 7.46 7.46 0.0 0 0 622.71 266.45 A 7.46 7.46 0.0 0 0 630.17 273.91 A 7.46 7.46 0.0 0 0 637.63 266.45 Z'%0A/%3E%3Cpath fill='%23" +
      startColor +
      "' d=' M 681.51 270.54 L 681.49 257.01 Q 681.49 256.26 682.24 256.25 L 683.27 256.24 Q 684.05 256.24 684.05 257.02 L 684.05 275.24 A 0.65 0.65 0.0 0 1 683.43 275.89 Q 682.64 275.93 681.91 275.75 Q 681.41 275.64 681.07 275.18 Q 675.53 267.76 670.50 260.85 Q 669.98 260.12 669.98 261.02 L 670.00 275.10 Q 670.00 275.96 669.15 275.86 L 668.13 275.74 Q 667.37 275.65 667.37 274.88 L 667.40 257.15 Q 667.40 256.58 667.93 256.39 Q 668.75 256.10 669.67 256.25 Q 670.20 256.34 670.51 256.76 L 680.95 270.73 Q 681.51 271.47 681.51 270.54 Z'%0A/%3E%3Cpath fill='%23" +
      startColor +
      "' d=' M 294.36 269.25 L 294.31 275.35 Q 294.31 276.00 293.65 276.00 L 292.49 275.99 Q 291.75 275.98 291.75 275.24 L 291.75 257.25 Q 291.75 256.76 292.23 256.74 Q 296.10 256.55 299.39 256.79 C 305.21 257.22 307.15 264.49 302.23 267.61 C 300.06 268.98 297.51 268.58 295.08 268.54 Q 294.36 268.52 294.36 269.25 Z M 294.34 259.47 L 294.36 265.83 A 0.33 0.33 0.0 0 0 294.69 266.16 L 298.50 266.15 A 3.98 3.41 -0.2 0 0 302.47 262.73 L 302.47 262.53 A 3.98 3.41 -0.2 0 0 298.48 259.13 L 294.67 259.14 A 0.33 0.33 0.0 0 0 294.34 259.47 Z'%0A/%3E%3Cpath fill='%23" +
      startColor +
      "' d=' M 334.69 269.53 L 334.71 275.49 A 0.65 0.64 -87.6 0 1 334.01 276.14 L 332.57 276.02 Q 331.93 275.97 331.93 275.32 L 331.96 257.32 Q 331.96 256.75 332.53 256.73 C 335.88 256.62 341.64 255.98 344.19 258.02 C 347.72 260.85 347.05 265.51 343.59 268.09 A 0.84 0.83 -31.9 0 0 343.34 269.12 L 346.39 275.38 Q 346.70 276.02 345.99 276.06 L 344.72 276.12 Q 343.98 276.16 343.67 275.49 L 340.95 269.67 Q 340.64 269.01 339.90 269.01 L 335.22 269.00 Q 334.69 269.00 334.69 269.53 Z M 334.71 259.56 L 334.69 266.10 A 0.40 0.40 0.0 0 0 335.09 266.50 L 340.31 266.51 A 3.48 3.33 0.1 0 0 343.80 263.19 L 343.80 262.51 A 3.48 3.33 0.1 0 0 340.33 259.17 L 335.11 259.16 A 0.40 0.40 0.0 0 0 334.71 259.56 Z'%0A/%3E%3Cpath fill='%23" +
      startColor +
      "' d=' M 420.77 257.05 A 0.40 0.40 0.0 0 1 421.17 256.65 L 427.54 256.67 A 9.79 9.42 0.2 0 1 437.30 266.13 L 437.30 266.61 A 9.79 9.42 0.2 0 1 427.48 275.99 L 421.11 275.97 A 0.40 0.40 0.0 0 1 420.71 275.57 L 420.77 257.05 Z M 423.30 259.54 L 423.28 273.08 A 0.40 0.40 0.0 0 0 423.68 273.48 L 427.57 273.49 A 7.17 6.96 0.1 0 0 434.75 266.54 L 434.75 266.12 A 7.17 6.96 0.1 0 0 427.59 259.15 L 423.70 259.14 A 0.40 0.40 0.0 0 0 423.30 259.54 Z'%0A/%3E%3Cpath fill='%23" +
      startColor +
      "' d=' M 557.71 259.70 L 557.71 275.60 A 0.54 0.54 0.0 0 1 557.13 276.14 L 555.43 276.01 A 0.54 0.54 0.0 0 1 554.93 275.47 L 555.06 259.67 A 0.54 0.54 0.0 0 0 554.52 259.13 L 549.35 259.11 A 0.54 0.54 0.0 0 1 548.81 258.58 L 548.79 257.24 A 0.54 0.54 0.0 0 1 549.33 256.69 L 563.23 256.69 A 0.54 0.54 0.0 0 1 563.77 257.21 L 563.82 258.55 A 0.54 0.54 0.0 0 1 563.29 259.11 L 558.24 259.16 A 0.54 0.54 0.0 0 0 557.71 259.70 Z'%0A/%3E%3C/svg%3E%0A";
  
    var backgroundElem = document.getElementsByClassName("wave");
    var logoElement = document.getElementById("background_logo");
  
    for (let i = 0; i < backgroundElem.length; i++) {
      backgroundElem[i].style.backgroundImage = 'url("' + backgroundsvg + '")';
    }
      logoElement.style.backgroundImage = 'url("' + logoSvg + '")';
      localStorage.setItem("theme_color", ColorValue);
  }
  