const letters = document.querySelectorAll(".game-letter");
const menu = document.querySelector(".start-menu");
let mode = 0;
let guessNumber = 0;
let buffer = "";
const sMenu = document.getElementById("start-menu"); // Start Menu
const lMenu = document.getElementById("lose-menu"); // Losing Menu
const wMenu = document.getElementById("win-menu"); // Winning Menu
const WORD_LENGTH = 5; // Winning Menu
let answer = "";
let stat = "newgame";
let inputDisabled = false; // Flag to disable input


function startGame(choice) {


  reset();
  sMenu.classList.add("disable");
  lMenu.classList.add("disable");
  wMenu.classList.add("disable");
  mode = choice;

  fetch(
    `https://words.dev-apis.com/word-of-the-day/?random=${
      mode === "rand" ? "1" : "0"
    }`
  )
    .then(function (res) {
      if (res.ok) return res.json();
      else alert("Error PLease Cry");
    })
    .then(function (data) {
      answer = data.word.toUpperCase();
        // TODO remove this line
       // console.log(answer);
      init();
    });
}

function reset() {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      letters[i * WORD_LENGTH + j].classList.remove("correct");
      letters[i * WORD_LENGTH + j].classList.remove("close");
      letters[i * WORD_LENGTH + j].classList.remove("wrong");
      letters[i * WORD_LENGTH + j].innerText = "";
    }
  }

  guessNumber = 0;
  buffer = "";
}

function init() {

  if (stat === "newgame") {
    // Event Listners to the (Physical Keyboard)
    document.addEventListener("keydown", function handleKeyPress(event) {
      const action = event.key;
      if(inputDisabled || stat != "playing") return;
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

    // Event Listners to the (Virtual Keyboard)
    const keys = document.querySelectorAll(".key");
    keys.forEach((key) => {
      key.addEventListener("click", function () {
        const action = key.innerText;
        if(inputDisabled || stat != "playing") return;
        if (action === "ENTER") {
          submit();
        } else if (action === "←") {
          backSpace();
        } else {
          addLetter(action.toUpperCase());
        }
      });
    });
  }
  stat="playing";

  function addLetter(letter) {
    if (buffer.length === WORD_LENGTH)
      buffer = buffer.substring(0, WORD_LENGTH - 1);
    buffer += letter;
    letters[guessNumber * WORD_LENGTH + buffer.length - 1].innerText = letter;
  }

  function backSpace() {
    buffer = buffer.substring(0, buffer.length - 1);
    letters[guessNumber * WORD_LENGTH + buffer.length].innerText = "";
  }

  async function submit() {
    inputDisabled = true;
    if (buffer.length < WORD_LENGTH) {
      // do nothing
    } else if (await isValid(buffer)) {
      let check = answer;
      check = check.split("");
      buffer = buffer.split("");

      for (let i = 0; i < WORD_LENGTH; i++) {
        if (buffer[i] === check[i]) {
          letters[guessNumber * WORD_LENGTH + i].classList.add("correct");
          check[i] = "#";
          buffer[i] = "$";
        }
      }

      console.log(buffer);
      console.log(check);
      for (let i = 0; i < WORD_LENGTH; i++) {
        if (buffer[i] !== "$") {
          let loc = check.indexOf(buffer[i]);
          if (loc !== -1) {
            check[loc] = "#";
            letters[guessNumber * WORD_LENGTH + i].classList.add("close");
          } else letters[guessNumber * WORD_LENGTH + i].classList.add("wrong");
        }
      }

      guessNumber++;
      buffer = "";

      if (guessNumber === 6) {
        stat = "lose";
        lMenu.classList.remove("disable");
      } else if (check.join("") === "#####") {
        stat = "win";
        wMenu.classList.remove("disable");
      }
    } else {
      for (let i = 0; i < WORD_LENGTH; i++) {
        letters[guessNumber * WORD_LENGTH + i].classList.add("nonValid");
      }
      setTimeout(function rem() {
        for (let i = 0; i < WORD_LENGTH; i++)
          letters[guessNumber * WORD_LENGTH + i].classList.remove("nonValid");
      }, 500);
    }
    inputDisabled = false;

  }

  function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

  async function isValid(word) {
    const res = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({ word }),
    });

    const { validWord } = await res.json();

    return validWord;
  }
}
