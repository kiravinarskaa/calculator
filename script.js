function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Nope, cannot divide by 0!";
  }

  return a / b;
}

function operate(operator, firstNumber, secondNumber) {
  if (operator === "+") {
    return add(firstNumber, secondNumber);
  } else if (operator === "-") {
    return subtract(firstNumber, secondNumber);
  } else if (operator === "*") {
    return multiply(firstNumber, secondNumber);
  } else if (operator === "/") {
    return divide(firstNumber, secondNumber);
  }
}

const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const decimalButton = document.querySelector(".decimal");
const backspaceButton = document.querySelector(".backspace");

let firstNumber = "";
let operator = "";
let secondNumber = "";
let shouldResetDisplay = false;

function updateDisplay(value) {
  display.textContent = value;
}

function roundResult(number) {
  return Math.round(number * 1000000) / 1000000;
}

numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (display.textContent === "0" || shouldResetDisplay) {
      display.textContent = "";
      shouldResetDisplay = false;
    }

    display.textContent += button.textContent;
  });
});

operatorButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (operator !== "" && !shouldResetDisplay) {
      secondNumber = display.textContent;
      const result = operate(operator, Number(firstNumber), Number(secondNumber));

      if (typeof result === "string") {
        updateDisplay(result);
        firstNumber = "";
        operator = "";
        secondNumber = "";
        shouldResetDisplay = true;
        return;
      }

      firstNumber = roundResult(result).toString();
      updateDisplay(firstNumber);
    } else {
      firstNumber = display.textContent;
    }

    operator = button.textContent;
    shouldResetDisplay = true;
  });
});

equalsButton.addEventListener("click", function () {
  if (firstNumber === "" || operator === "" || shouldResetDisplay) {
    return;
  }

  secondNumber = display.textContent;
  const result = operate(operator, Number(firstNumber), Number(secondNumber));

  if (typeof result === "string") {
    updateDisplay(result);
  } else {
    updateDisplay(roundResult(result));
  }

  firstNumber = "";
  operator = "";
  secondNumber = "";
  shouldResetDisplay = true;
});

clearButton.addEventListener("click", function () {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  shouldResetDisplay = false;
  updateDisplay("0");
});

decimalButton.addEventListener("click", function () {
  if (shouldResetDisplay) {
    display.textContent = "0";
    shouldResetDisplay = false;
  }

  if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
});

backspaceButton.addEventListener("click", function () {
  if (shouldResetDisplay) {
    return;
  }

  display.textContent = display.textContent.slice(0, -1);

  if (display.textContent === "") {
    display.textContent = "0";
  }
});