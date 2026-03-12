let wordBankEasy = ["snowman", "sleigh", "icicle", "frosty", "mittens", "hot chocolate", "frozen"];

let wordBankMedium = ["candycane", "sledding", "winter hat", "hollyberry", "icehouse", "snowglobe", "snowangel"];

let wordBankHard = ["blizzardly", "frostbite", "wintertime", "winter apparel", "winter wonderland", "ice palace", "polar expedition"];


document.addEventListener("DOMContentLoaded", function () {
    // Add event listener for easy mode button
    const easyBtn = document.querySelector('.easyMode');
    easyBtn.addEventListener('click', () => {
        startGame('easy');
    });
    
});

function startGame(difficulty) {
    let wordBank;
    switch (difficulty) {
        case 'easy':
            wordBank = wordBankEasy;
            break;
        case 'medium':
            wordBank = wordBankMedium;
            break;
        case 'hard':
            wordBank = wordBankHard;
            break;
        default:
            console.error("Invalid difficulty level");
            return;
    }

if btn easy is clicked, then wordBank = wordBankEasy
    when the button is clicked then have the thing pick a rabdom wordBank[Math.floor(Math.random() * wordBank.length)]
        then for each letter in the word, create a blank space and add it to the page
            if the user gets it wrong then change the Image and dark out the letter in the keyboard
            else if the user gets it right then fill in the blank space with the letter
            if the user gets all the letters right then they win and the game is over
            else if the user gets all the letters wrong then they lose and the game is over


if btn medium is clicked, then wordBank = wordBankMedium
if btn hard is clicked, then wordBank = wordBankHard