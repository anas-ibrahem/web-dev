const letters = document.querySelectorAll(".game-letter");
const menu = document.querySelector(".start-menu");
let mode = 0;
let guessNumber = 0;
const sMenu = document.getElementById('start-menu'); // Start Menu
const lMenu = document.getElementById('lose-menu');  // Losing Menu
const wMenu = document.getElementById('win-menu');   // Winning Menu


function startGame(choice) {
   sMenu.classList.add("disable");
    mode = choice;
    guessNumber = 0;
}       

console.log(letters[0].innerText);