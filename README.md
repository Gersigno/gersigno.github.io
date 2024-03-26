<div align="center">
  <img src="https://raw.githubusercontent.com/Gersigno/gersigno.github.io/main/resources/gwp_logo_alpha.PNG" alt="A huge banner logo on my enterprise.">
</div>

<h1 align="center">My <i>Online</i> portfolio</h1>
<h3 align="center">A beautiful, fluent, web OS like online portfolio !</h3>
<p align="center"> <small> <i>Make sure to star ⭐ this repo if you enjoy my work !</i> </small> </p>

![Preview](https://raw.githubusercontent.com/Gersigno/gersigno.github.io/main/previews/portfolio_preview.png)
<div align="center">
  <a href="https://gersigno.github.io/">Test it right now</a>
</div>

# 📍 Introduction
<b>Welcome to my portfolio's repository!</b>

Discover a unique and intuitive experience through my portfolio thanks to a familiar desktop interface !

> [!NOTE]
> This project is still in **Beta**, some features may not work as intended and the code is still a bit messy in some places. <br>
> *Feel free to report any bugs [here](https://github.com/Gersigno/gersigno.github.io/issues/new)* 👍

# 📑 Table of content
<dl><dd>
  
- [📦Features](https://github.com/Gersigno/gersigno.github.io/edit/main/README.md#features)
<dl><dd><dl><dd>

- [🎨Design](https://github.com/Gersigno/gersigno.github.io/edit/main/README.md#design)
- [✍Customization](https://github.com/Gersigno/gersigno.github.io/edit/main/README.md#customization)
- [⏳Comming soon](https://github.com/Gersigno/gersigno.github.io/edit/main/README.md#comming-soon)
</dd></dl></dd></dl>

- [💻For developpers](https://github.com/Gersigno/gersigno.github.io/edit/main/README.md#for-developpers)
<dl><dd><dl><dd>
  
- [🏁Getting started](https://github.com/Gersigno/gersigno.github.io/edit/main/README.md#getting-started)
- [📲Create your own application](https://github.com/Gersigno/gersigno.github.io/edit/main/README.md#create-your-own-application)
- [📩Popup](https://github.com/Gersigno/gersigno.github.io/edit/main/README.md#-how-to-use-pop-ups)
- [💭Toast notifications.](https://github.com/Gersigno/gersigno.github.io/edit/main/README.md#-how-to-use-pop-ups)
</dd></dl></dd></dl>
  
- [🧰Technologies](https://github.com/Gersigno/gersigno.github.io/edit/main/README.md#technologies)
- [🧠Credits](https://github.com/Gersigno/gersigno.github.io/edit/main/README.md#credits)
- [🧐Support](https://github.com/Gersigno/gersigno.github.io/edit/main/README.md#support)
</dd></dl>


# 📦 Features

<dl><dd>

## 🎨 Design
### Glass translucency
This effect was archived by mixing blur effect and a noise texture in the background to create some depth.
![GlassEffect](https://raw.githubusercontent.com/Gersigno/gersigno.github.io/main/previews/portfolio_blur.png)
It's heavly inspired of [Microsoft](https://github.com/microsoft)'s [Acrylic effect](https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic)

## ✍ Customization
You can **customize** your experience from the **settings application**.
![Settings](https://raw.githubusercontent.com/Gersigno/gersigno.github.io/main/previews/portfolio_settings.gif) <br>
💾 *All settings are **saved** in your local storage.*
## ⏳ Comming soon
These features are work-in-progress and will come in future updates:
- **Game development** page content
- Responsive
- Translations *(localization)*
- More web development projects.

</dd></dl>

# 💻 For developpers

<dl><dd>
  
The code is partially commented and documented.
### 🏁 Getting started
> [!IMPORTANT]
> Do not forget that this project is still in development, functions could be modified in future updates.
### 📲 Create your own application
<dl><dd>
  
🚨 ***Your whole application needs to be usable in a html type file.*** <br>
  
First, create a folder of your project's name in the `_subpages` folder.

Then, in the `desktop.js` file located at `scripts\desktop\desktop.js`, create a new **`DesktopIcon`** object instance.<br>
<ins>Syntax:</ins>
```js
new DesktopIcon((String)title, (String)icon, (function)funcPtr, (String)shandler);
```
```css
title: The text shown at the bottom of the shortcut;
icon: The relative path of your icon's image file;
funcPtr: The function to call on any left click event (can have parameters);
shandler: Unique text to distinguish between different icons.;
```
You will need to call the **`createWindow(...)`** function on your icon's click event to create your window.
<ins>Exemple:</ins>
```js
new DesktopIcon("Title", "icons/myIcon.png", ()=>createWindow("icons/myIcon.png", "Title","_subpages\\my_app\\index.html","myApp"), "myApp_shortcut");
```
</dd></dl>

### 📩 How to use pop-ups.
<dl><dd>
  
To create a pop-up, you can simply use the `UI_CreatePupup()` function. <br>
<ins>Syntax:</ins>
  
```js
UI_CreatePupup((String)icon, (String)title, (String)message, (String)okText, (function)okFunction, (String)cancelText, (function)cancelFunction);
```
```css
icon: The relative path of your icon's image file;
title: The title of the pop-up;
message: the message shown at the center of the pop-up;
okText: The text of the primary (left) button;
okFunction: The function to call when the primary button is clicked by the user;
cancelText: [not required] The text of the secondary (right) button;
cancelFunction: [not required] The function to call when the secondary button is clicked by the user;
```

Exemple:
```js
UI_CreatePupup("icons/myIcon.png", "Pop-up Title", "Pop-up description", "Ok",()=>ok_function(), "Cancel", ()=>cancel_function());
```
</dd></dl>

### 💭 How to use Toast notifications.
<dl><dd>
  
To create toast notifications, you can simply use the `UI_CreatePupup()` function. <br>
<ins>Syntax:</ins>
  
```js
new ToastNotify(icon, title, description);
```
```css
icon: The relative path of your icon's image file;
title: The title of the toast notification;
description: [not required] The description (secondary text) of the notification.
```

Exemple:
```js
new ToastNotify("icons/myIcon.png", "Toast notification", "A simple notification");
```
</dd></dl>
</dd></dl>

# 🧰 Technologies
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white) 
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white) 
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=white)

![Visual Studio Code Logo](https://img.shields.io/badge/Visual%20Code-1.85-007ACC?logo=visualstudiocode) 


# 🧠 Credits
<dl><dd>
  
- Author [@Gersigno](https://www.github.com/gersigno)

Online resources
- *Switch elements style* by [Marcus Burnette](https://codepen.io/mburnette)
- *Simple date format* by [Emil S. Jørgensen](https://stackoverflow.com/users/5242739/emil-s-j%c3%b8rgensen)
  
Thanks to
- [David R.](https://github.com/69sazuke) for his help on the project.
- [Zen design](https://www.designbyzen.fr/) for his advice on ui/ux design.

- All icons used in this project come from [icons8](https://icones8.fr/)
</dd></dl>

# 🧐 Support

For support, email contact.gersigno@gmail.com or join the ***[discord server](https://discord.gg/kr3mwwg8jR)***.

