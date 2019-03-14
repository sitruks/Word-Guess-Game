// GLOBAL VARIABLES

var selectableWords = 
    [
        "tetris",
        "super mario",
        "donkey kong",
        "frogger",
        "asteroids",
        "galaga",
        "dig dug",
        "space invaders",
        "centipede",
        "defender",
        "joust",
        "pong",
        "missile command",
    ];

const maxTries = 10;            // Maximum number of tries player has
var guessLetters = [];        // Stores the letters the user guessed
var currentWordIndex;           // Index of the current word in the array
var guessWord = [];          // This will be the word we actually build to match the current word
var guessRemain = 0;       // How many tries the player has left
var gameStart = false;        // Flag to tell if the game has started
var gameFinish = false;        // Flag for 'press any key to try again'     
var wins = 0;                   // How many wins has the player racked up

// SET GAME VARIABLES FOR START

function resetGame() {
    guessRemain = maxTries;
    gameStart = false;
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));
    guessLetters = [];
    guessWord = [];
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("loseImage").style.cssText = "display: none";
    document.getElementById("winImage").style.cssText = "display: none";

    // Make sure the hangman image is cleared
    document.getElementById("pacmanImage").src = "";

    // Build the guessing word and clear it out
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessWord.push("_");
    }


    updateDisplay();
};

//  Updates the display on the HTML Page
function updateDisplay() {

    document.getElementById("gameWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessWord.length; i++) {
        document.getElementById("currentWord").innerText += guessWord[i];
    }
    document.getElementById("guessRemain").innerText = guessRemain;
    document.getElementById("guessLetters").innerText = guessLetters;
    if(guessRemain <= 0) {
        document.getElementById("loseImage").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        gameFinish = true;
    }
};

// GUESS DEPENDENT FUNCTIONS

function updatepacmanImage() {
    document.getElementById("pacmanImage").src = "assets/images/" + (maxTries - guessRemain) + ".png";
};

document.onkeyup = function(event) {
    if(gameFinish) {
        resetGame();
        gameFinish = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

function makeGuess(letter) {
    if (guessRemain > 0) {
        if (!gameStart) {
            gameStart = true;
        }
        if (guessLetters.indexOf(letter) === -1) {
            guessLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
};

// This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if(selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess and update the hangman image
    if (positions.length <= 0) {
        guessRemain--;
        updatepacmanImage();
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            guessWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessWord.indexOf("_") === -1) {
        document.getElementById("winImage").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        gameFinish = true;
    }
};