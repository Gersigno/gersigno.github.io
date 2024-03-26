
![GWP Logo Large](https://raw.githubusercontent.com/Gersigno/gersigno.github.io/main/resources/gwp_logo_alpha.PNG)

# 😵 Hangman game *(Le pendu)* !
A simple **Javascript** Hangman *(Pendu)* game with an *html/css* interface and **different difficulties** *(French words dictionary)*

(*The code is still a bit messy in some places, please don't judge it too harshly* 😔)

💡***Note**: This project was made during my web development training* 👍

## 🥇Objective
Your objective is to guess the secret word by finding one by one the letters that compose it, while making the minimum possible mistakes !

## 🖼Screenshots
<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/Gersigno/Hangman-Javascript/main/resources/previews/preview.png"></td>
    <td><img src="https://raw.githubusercontent.com/Gersigno/Hangman-Javascript/main/resources/previews/win_preview.png"></td>
    <td><img src="https://raw.githubusercontent.com/Gersigno/Hangman-Javascript/main/resources/previews/lose%20preview.png"></td>
  </tr>
</table>

## 📱Responsive
This project is also fully responsive (except for the Apple watch 😔)
<table>
  <tr>
        <td><img src="https://raw.githubusercontent.com/Gersigno/Hangman-Javascript/main/resources/previews/pendu_tablet.png"></td>
    <td><img src="https://raw.githubusercontent.com/Gersigno/Hangman-Javascript/main/resources/previews/pendu_macbook.png"></td>
    <td><img src="https://raw.githubusercontent.com/Gersigno/Hangman-Javascript/main/resources/previews/pendu_mobile.png"></td>
  </tr>
</table>

## 🧰Technologies
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white) 
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white) 
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=white)

![Visual Studio Code Logo](https://img.shields.io/badge/Visual%20Code-1.85-007ACC?logo=visualstudiocode) 

## 📜How to change the words list
You can change the words list by rewriting the `dictionnaire` array variable inside the `scripts\dictionary.js` file.
Like this:
```js
  var dictionnaire = [ "Word" , "Multiple words" , "Composed-Word", "Wow' BG Gersigno" ...];
```

## 🛡️What's handled by the code?
The code supports non-alphabetic characters (like `-`, `'`, *white spaces* etc..), theses characters will be shown anyway at the beginning of the game.
Duplicated letters are also supported.

## 🧐Support

For support, email contact.gersigno@gmail.com or join the ***[discord server](https://discord.gg/kr3mwwg8jR)***.
