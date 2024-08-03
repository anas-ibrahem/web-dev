const letters = document.querySelectorAll(".game-letter");
const menu = document.querySelector(".start-menu");
let mode = 0;
let guessNumber = 0;
let buffer = "";
const sMenu = document.getElementById("start-menu"); // Start Menu
const lMenu = document.getElementById("lose-menu"); // Losing Menu
const wMenu = document.getElementById("win-menu"); // Winning Menu
const WORD_LENGTH = 5; // Winning Menu

function startGame(choice) {
  sMenu.classList.add("disable");
  mode = choice;
  reset();
  init();
}

function reset() {
  guessNumber = 0;
  buffer = "";
}

function init() {
  document.addEventListener("keydown", function handleKeyPress(event) {
    const action = event.key;

    if (action === "Enter") {
      submit();
    } else if (action === "Backspace") {
      backSpace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      // do nothing
    }
  });

  function addLetter(letter) {
    if (buffer.length === WORD_LENGTH)
      buffer = buffer.substring(0, WORD_LENGTH - 1);
    buffer += letter;
    letters[guessNumber * WORD_LENGTH + buffer.length - 1].innerText = letter;
  }

  function backSpace(){
    buffer = buffer.substring(0, buffer.length - 1);
    letters[guessNumber * WORD_LENGTH + buffer.length ].innerText = '';
  }

  function submit(){
    if(buffer.length < WORD_LENGTH)
    {
        // do nothing
    }
    else
    {




    }

  }
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}
