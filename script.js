function add(a, b) {  // Function for addition
  return a + b;
}

function subtract(a, b) { // Function for subtraction
  return a - b;
}

function multiply(a, b) {  // Function for multiplication
  return a * b;
}

function divide(a, b) {  // Function for division
  if (b === 0) {
    return "Nope, cannot divide by 0!";
  }

  return a / b;
}
// Function that selects the correct operation
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
// Select calculator elements from the HTML page
const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const decimalButton = document.querySelector(".decimal");
const backspaceButton = document.querySelector(".backspace");
// Variables used to store the current calculation
let firstNumber = "";
let operator = "";
let secondNumber = "";
let shouldResetDisplay = false;

function updateDisplay(value) { // Function to update the calculator display
  display.textContent = value;
}
// Function to round results to 6 decimal places
function roundResult(number) {
  return Math.round(number * 1000000) / 1000000;
}
// Add click events to all number buttons
numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {

     // Clear display before entering a new number
    if (display.textContent === "0" || shouldResetDisplay) {
      display.textContent = "";
      shouldResetDisplay = false;
    }
 // Add clicked digit to the display
    display.textContent += button.textContent;
  });
});
// Add click events to operator buttons (+, -, *, /)
operatorButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // If an operation is already waiting, calculate it first
    if (operator !== "" && !shouldResetDisplay) {
      secondNumber = display.textContent;
      const result = operate(operator, Number(firstNumber), Number(secondNumber));

        // Handle division by zero message
      if (typeof result === "string") {
        updateDisplay(result);
        firstNumber = "";
        operator = "";
        secondNumber = "";
        shouldResetDisplay = true;
        return;
      }

      firstNumber = roundResult(result).toString(); // Store result for chained calculations
      updateDisplay(firstNumber);
    } else {
      firstNumber = display.textContent; // Store first number before selecting operator
    }
  // Save selected operator
    operator = button.textContent;
    shouldResetDisplay = true;   // Prepare display for second number input
  });
});
// Equals button event
equalsButton.addEventListener("click", function () {
    // Prevent calculation if data is incomplete
  if (firstNumber === "" || operator === "" || shouldResetDisplay) {
    return;
  }
// Get second number from display
  secondNumber = display.textContent;
  // Perform calculation
  const result = operate(operator, Number(firstNumber), Number(secondNumber));
// Display result or error message
  if (typeof result === "string") {
    updateDisplay(result);
  } else {
    updateDisplay(roundResult(result));
  }

  firstNumber = "";   // Reset stored values after calculation
  operator = "";
  secondNumber = "";
  shouldResetDisplay = true;
});
// Clear button event
clearButton.addEventListener("click", function () {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  shouldResetDisplay = false;
  updateDisplay("0");
});
// Decimal point button event
decimalButton.addEventListener("click", function () {
  if (shouldResetDisplay) { // Start a new decimal number after calculation
    display.textContent = "0";
    shouldResetDisplay = false;
  }
// Prevent multiple decimal points
  if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
});
// Backspace button event
backspaceButton.addEventListener("click", function () {
  if (shouldResetDisplay) {   // Do nothing if waiting for new input
    return;
  }
// Remove the last character from the display
  display.textContent = display.textContent.slice(0, -1);

  if (display.textContent === "") {   // If display becomes empty, show 0
    display.textContent = "0";
  }
});
