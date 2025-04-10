/**
 * This function is called when our html's body is fully loaded,
 * it will trigger the "InitGame()" function
 */
function Event_Loaded() {
    //when the page is loaded, we can initialize the game..
    InitGame();
}

/**
 * This function will restart our game and pick up a new random word from our dictionary.
 */
function Event_newWord() {

    updateKeyboard();

    wordToGuess = "";
    revealedLetters = [];
    tries = 0;
    var element_keyboard = document.getElementById("VirtualKeyboard");
    var element_message = document.getElementById("message");

    root.style.setProperty('--hangman-src', "url(\"../resources/p0.png\")");
    root.style.setProperty('--background-color', "rgb(227,227,227)");
    element_keyboard.classList.remove("KeyboardDisabled");
    element_keyboard.classList.add("KeyboardEnabled");

    InitGame();

    element_message.innerHTML = "";
    element_message.classList.remove("MessageVisible");
    element_message.classList.add("MessageHidden");
}

/**
 * Adjust the game's difficulty by selecting the value of the difficulty drop down menu.
 */
function Event_UpdateDifficulty() {
    difficulty = document.getElementById("difficulty").value;
    Event_newWord();
}

/**
 * Called by our keyboard's button on click events.
 * @param {*} letter button's letter (pass it as an "this" reference from the onclick event)
 */
function Event_GuessNewLetter(letter) {
    //First, obtain the inner letter of our button..
    var targetLetter = letter.innerHTML;
    //then, push it into our revealed letters array.
    revealedLetters.push(targetLetter);
    UpdateUI();
    isLetterInWord(targetLetter)
    updateKeyboard();
}

/**
 * Event called when the player loses/runs out of attempts.
 */
function Event_Lose() {
    var element_keyboard = document.getElementById("VirtualKeyboard");
    var element_message = document.getElementById("message");

    element_message.innerHTML = "Perdu ! <br>Le mot était : <b>" + wordToGuess + "</b><br>Clique ici pour re-jouer";
    element_keyboard.classList.remove("KeyboardEnabled");
    element_keyboard.classList.add("KeyboardDisabled");
    element_message.classList.remove("MessageHidden");
    element_message.classList.add("MessageVisible");
}

/**
 * Event called when the player has guessed successfully our secret word
 */
function Event_Won() {
    var element_keyboard = document.getElementById("VirtualKeyboard");
    var element_message = document.getElementById("message");

    element_message.innerHTML = "Bien joué ! <br>Tu as trouvé en <b>"+tries+"</b> essais!<br>Clique ici pour re-jouer";
    root.style.setProperty('--background-color', "rgb(0,125,0)");
    element_keyboard.classList.remove("KeyboardEnabled");
    element_keyboard.classList.add("KeyboardDisabled");
    element_message.classList.remove("MessageHidden");
    element_message.classList.add("MessageVisible");
}