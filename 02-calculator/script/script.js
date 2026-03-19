let calculation = localStorage.getItem("calculation") || ""; // Load saved calculation or start with an empty string

function updateDisplay() {
  document.getElementById("display").textContent = calculation; // Update the display with the current calculation
}

function saveCalculation() {
  localStorage.setItem("calculation", calculation);
}

function isOperator(value) { // Check if the value is an operator (with spaces around it)
  return (
    value === " + " || value === " - " || value === " * " || value === " / "
  );
}

function getCurrentNumber() { // Get the current number from the calculation by splitting the calculation string at operators and returning the last part
  const parts = calculation.split(/ \+ | \- | \* | \/ /);
  return parts[parts.length - 1] || "";
}

function addToCalculation(value) {
  const trimmedCalculation = calculation.trim();
  const lastThreeChars = calculation.slice(-3);
  const currentNumber = getCurrentNumber();

  if (isOperator(value)) {
    if (!trimmedCalculation) {
      return;
    }

    if (isOperator(lastThreeChars)) {
      calculation = calculation.slice(0, -3) + value;
      saveCalculation();
      updateDisplay();
      return;
    }
  }

  if (value === ".") {
    if (currentNumber.includes(".")) {
      return;
    }

    if (currentNumber === "") {
      calculation += "0";
    }
  }

  calculation += value;
  console.log(calculation);
  saveCalculation();
  updateDisplay();
}

function calculateResult() {
  const trimmedCalculation = calculation.trim();

  if (!trimmedCalculation || isOperator(calculation.slice(-3))) {
    return;
  }

  try {
    const result = eval(trimmedCalculation);

    if (!Number.isFinite(result)) {
      calculation = "Error";
      updateDisplay();
      localStorage.removeItem("calculation");
      return;
    }

    calculation = String(result);
    console.log(calculation);
    saveCalculation();
    updateDisplay();
  } catch {
    calculation = "Error";
    updateDisplay();
    localStorage.removeItem("calculation");
  }
}

function clearCalculation() {
  calculation = "";
  document.getElementById("display").textContent = "";
  localStorage.removeItem("calculation");
}

updateDisplay(); // Initialize display
