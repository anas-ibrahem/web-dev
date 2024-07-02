const result = document.querySelector(".result");
let runningresult = 0;
let buffer = 0;
let operator = 0;

function print(text) {
  result.innerText = text;
}

function update()
{
  if (operator === "=") 
    {
    print(runningresult);
  } else {
    print(buffer);
  }
}

function buttonClick(event) {
  if (isNaN(parseInt(event))) handleSymbol(event);
  else handleValue(event);

  update();
}

function handleValue(value) {
  if (buffer === 0) buffer = value;
  else buffer += value;

  if (operator != 0) {
    calculate();
  }
  
}

function handleSymbol(symbol) {


    switch (symbol) {
    case "C":
      buffer = 0;
      operator = 0;
      runningresult = 0;
      break;

    case "+":
      operator = "+";
      break;

    case "-":
      operator = "-";
      break;

    case "×":
      operator = "*";
      break;

    case "÷":
      operator = "/";
      break;

    case "=":
      operator = "=";
      buffer = 0;
      break;
  }
}

function calculate() {
  switch (operator) {
    case "+":
      runningresult += parseInt(buffer);
      break;

    case "-":
      runningresult -= parseInt(buffer);
      break;

    case "*":
      runningresult *= parseInt(buffer);
      break;

    case "/":
      runningresult /= parseInt(buffer);
      break;

    default:
      break;
  }
}

function init() {
  document
    .querySelector(".keyboard")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
