// -------------------- WORD BANKS --------------------
let wordBankEasy = ["snowman", "sleigh", "icicle", "frosty", "mittens", "hotchocolate", "frozen"];
let wordBankMedium = ["candycane", "sledding", "icehouse", "snowglobe", "snowangel", "hollyberry", "winter hat"];
let wordBankHard = ["blizzardly", "frostbite", "wintertime", "icepalace", "polarexpedition", "winterapparel", "winter wonderland"];

// -------------------- IMAGE ARRAYS --------------------
let imagesEasy = [
    "easyHangman/eastStart.png", "easyHangman/easy2.png", "easyHangman/easy3.png", "easyHangman/easy4.png",
    "easyHangman/easy5.png", "easyHangman/easy6.png", "easyHangman/easy7.png", "easyHangman/easy8.png", "easyHangman/easy9.png", "easyHangman/easy9.png"
];
let imagesMedium = [
    "mediumHangman/mediumStart.png", "mediumHangman/medium2.png", "mediumHangman/medium3.png", "mediumHangman/medium4.png",
    "mediumHangman/medium5.png", "mediumHangman/medium6.png", "mediumHangman/medium7.png", "mediumHangman/medium7.png"
];
let imagesHard = [
    "hardHangman/hardStart.png", "hardHangman/hard2.png", "hardHangman/hard3.png", "hardHangman/hard4.png", "hardHangman/hard5.png", "hardHangman/hard5.png"
];

// -------------------- GAME VARIABLES --------------------
let secretWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
let maxGuesses = 0;
let gameOver = false;
let currentImages = [];

// -------------------- PAGE LOAD --------------------
document.addEventListener("DOMContentLoaded", function () {

    // Difficulty buttons
    document.querySelector(".easyMode").addEventListener("click", () => startGame("easy"));
    document.querySelector(".mediumMode").addEventListener("click", () => startGame("medium"));
    document.querySelector(".hardMode").addEventListener("click", () => startGame("hard"));

    // Guess button
    document.getElementById("guessBtn").addEventListener("click", handleGuess);

    // Enter key for input
    document.getElementById("guessInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            handleGuess();
        }
    });

    // Restart button
    document.getElementById("restartBtn").addEventListener("click", restartGame);

    // Build on-screen keyboard
    buildKeyboard();

    // Initial prompt
    document.getElementById("message").textContent = "Please pick a level first.";
      
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("restartBtn").disabled = true;
    document.getElementById("guessInput").disabled = true;
});

// -------------------- START GAME --------------------
function startGame(difficulty) {

    // Set word bank and max guesses based on difficulty
    if (difficulty === "easy") {
        secretWord = wordBankEasy[Math.floor(Math.random() * wordBankEasy.length)];
        maxGuesses = 9;
        currentImages = imagesEasy;
    }
    if (difficulty === "medium") {
        secretWord = wordBankMedium[Math.floor(Math.random() * wordBankMedium.length)];
        maxGuesses = 7;
        currentImages = imagesMedium;
    }
    if (difficulty === "hard") {
        secretWord = wordBankHard[Math.floor(Math.random() * wordBankHard.length)];
        maxGuesses = 5;
        currentImages = imagesHard;
    }

    // Reset game state
    guessedLetters = [];
    wrongGuesses = 0;
    gameOver = false;
    document.getElementById("message").textContent = "";

    // Enable game controls
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("restartBtn").disabled = false;
    document.getElementById("guessInput").disabled = false;

    // Disable difficulty buttons during game
    document.querySelector(".easyMode").disabled = true;
    document.querySelector(".mediumMode").disabled = true;
    document.querySelector(".hardMode").disabled = true;

    // Reset keyboard
    let keys = document.querySelectorAll(".key");
    keys.forEach(key => key.className = "key");

    updateDisplay();
    updateImage();
}

// -------------------- HANDLE GUESS --------------------
function handleGuess() {

    if (gameOver) return;

    let input = document.getElementById("guessInput");
    let letter = input.value.toLowerCase();
    input.value = "";

    // Validate input
    if (letter.length !== 1 || !letter.match(/[a-z]/)) {
        document.getElementById("message").textContent = "Enter one letter (A-Z).";
        return;
    }

    // Check duplicate
    if (guessedLetters.includes(letter)) {
        document.getElementById("message").textContent = "You already guessed that.";
        return;
    }

    guessedLetters.push(letter);

    // Correct or wrong
    if (secretWord.includes(letter)) {
        colorKey(letter, "correct");
    } else {
        wrongGuesses++;
        colorKey(letter, "wrong");
        updateImage();
    }

    updateDisplay();
    checkGame();
}

// -------------------- UPDATE WORD DISPLAY --------------------
function updateDisplay() {
    let display = "";

    for (let i = 0; i < secretWord.length; i++) {
        let letter = secretWord.charAt(i);

        if (letter === " ") {
            display += "  "; // double space between words
        }
        else if (guessedLetters.includes(letter)) {
            display += letter + " ";
        }
        else {
            display += "_ ";
        }
    }

    document.getElementById("wordDisplay").textContent = display;
    document.getElementById("guessedLetters").textContent = guessedLetters.join(" ");
    document.getElementById("guessesLeft").textContent = maxGuesses - wrongGuesses;
}

// -------------------- CHECK WIN/LOSE --------------------

function checkGame() {
    let win = true;

    for (let i = 0; i < secretWord.length; i++) {
        let letter = secretWord.charAt(i);
        if (letter !== " " && !guessedLetters.includes(letter)) {
            win = false;
        }
    }

    if (win) {
        document.getElementById("message").textContent = "You Win!";
        gameOver = true;
        return;
    }

    if (wrongGuesses >= maxGuesses) {
        document.getElementById("message").innerHTML =
            "Lose! Word was: <b>" + secretWord + "</b><br><b>Pick a level to play again</b>";
        gameOver = true;

        // **Remove the snowman image completely**
        document.getElementById("hangmanImg").src = "lose.png";
    }
}
// -------------------- UPDATE IMAGE --------------------
function updateImage() {
    let img = document.getElementById("hangmanImg");
    if (wrongGuesses >= currentImages.length) {
        wrongGuesses = currentImages.length - 1;
    }
    img.src = currentImages[wrongGuesses];
}

// -------------------- BUILD KEYBOARD --------------------
function buildKeyboard() {
    let keyboard = document.getElementById("keyboard");
    keyboard.innerHTML = "";

    // Split the keyboard into rows for a more natural layout
    let rows = [
        "qwertyuiop",
        "asdfghjkl",
        "zxcvbnm"
    ];

    rows.forEach((rowLetters) => {
        let row = document.createElement("div");
        row.classList.add("keyboard-row");

        for (let i = 0; i < rowLetters.length; i++) {
            let letter = rowLetters[i];
            let key = document.createElement("button");
            key.textContent = letter;
            key.classList.add("key");

            key.addEventListener("click", function () {
                document.getElementById("guessInput").value = letter;
                handleGuess();
            });

            row.appendChild(key);
        }

        keyboard.appendChild(row);
    });
}

// -------------------- COLOR KEYS --------------------
function colorKey(letter, type) {
    let keys = document.querySelectorAll(".key");
    keys.forEach(key => {
        if (key.textContent === letter) {
            if (type === "correct") {
                key.classList.add("correct");
            }
            if (type === "wrong") {
                key.classList.add("wrong");
            }
        }
    });
}

// -------------------- RESTART GAME --------------------
function restartGame() {
    document.querySelector(".easyMode").disabled = false;
    document.querySelector(".mediumMode").disabled = false;
    document.querySelector(".hardMode").disabled = false;

    guessedLetters = [];
    wrongGuesses = 0;
    gameOver = false;

    document.getElementById("message").textContent = "";
    document.getElementById("guessInput").value = "";

    let keys = document.querySelectorAll(".key");
    keys.forEach(key => key.className = "key");

    document.getElementById("hangmanImg").src = currentImages[0] || "";
    document.getElementById("wordDisplay").textContent = "";
    document.getElementById("guessedLetters").textContent = "";
    document.getElementById("guessesLeft").textContent = "";
}








// FOR THE SNOW EFFECT ON THE BACKGROUND
    // Generate snow dynamically for full screen 
    const snowWrapper = document.querySelector('.snow-wrapper');
    const snowCount = 100; // more snowflakes
    for (let i = 0; i < snowCount; i++) {
      const snow = document.createElement('div');
      snow.classList.add('snow');
      snow.style.left = Math.random() * 100 + 'vw';
      const size = 5 + Math.random() * 15;
      snow.style.width = size + 'px';
      snow.style.height = size + 'px';
      snow.style.animationDuration = 5 + Math.random() * 5 + 's';
      snow.style.animationDelay = Math.random() * 5 + 's';
      snowWrapper.appendChild(snow);
    }
