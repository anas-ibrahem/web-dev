const result = document.querySelector(".result");

let runningresult = 0; // Stores the result (behind the scenes)
let buffer = "0"; // Stores The Current Value printed on Screen
let prevOperator = 0; // Stores The Last Operation

function print(text) {
  result.innerText = text;
}

function buttonClick(event) {
  if (isNaN(parseInt(event))) {
    handleSymbol(event);
    print(event !== "←" ? runningresult : buffer);
  } else {
    handleValue(event);
    print(buffer);
  }
}

function handleValue(value) {
  if (buffer === "0") buffer = value;
  else buffer += value;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C": // Clear Everything
      buffer = "0";
      prevOperator = 0;
      runningresult = 0;
      break;

    case "←":
      if (buffer.length > 1) buffer = buffer.substring(0, buffer.length - 1);
      else buffer = "0";

      break;

    default:
      calculate(prevOperator);
      buffer = "0";
      prevOperator = symbol;
      break;
  }
}

function calculate(operator) {
  switch (operator) {
    case "+":
      runningresult += parseInt(buffer);
      break;

    case "-":
      runningresult -= parseInt(buffer);
      break;

    case "×":
      runningresult *= parseInt(buffer);
      break;

    case "÷":
      runningresult /= parseInt(buffer);
      break;

    default:
      if (buffer != "0") runningresult = parseInt(buffer); // Handle New Input Case & Multiple Clicks
      break;
  }
}

function init() {
  document
    .querySelector(".keyboard")
    .addEventListener("click", function (event) {
      if (event.target.innerText.length === 1)
        // Safety for Empty space Area
        buttonClick(event.target.innerText);
    });
}

init();