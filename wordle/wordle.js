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

function startGame(choice) {
  sMenu.classList.add("disable");
  mode = choice;
  reset();

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
      console.log(answer);
      init();
    });
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

  function backSpace() {
    buffer = buffer.substring(0, buffer.length - 1);
    letters[guessNumber * WORD_LENGTH + buffer.length].innerText = "";
  }

 async function submit() {
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
    }
    else
    {
        for (let i = 0; i < WORD_LENGTH; i++){
            letters[guessNumber * WORD_LENGTH + i].classList.add("nonValid");
        }
        setTimeout(function rem(){
            for (let i = 0; i < WORD_LENGTH; i++)
                letters[guessNumber * WORD_LENGTH + i].classList.remove("nonValid");
        } , 500);
  }
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

async function isValid(word){
    const res = await fetch("https://words.dev-apis.com/validate-word", {
        method: "POST",
        body: JSON.stringify({ word }),
      }); 


      const { validWord } = await res.json();

      return validWord;

}}