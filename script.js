// GLOBAL VARIABLES
let valueOne = "";
let valueTwo = "";
let solvedAnswer = "";
let operator = "";
let resetReady = false;

// CALCULATOR DISPLAY VARIABLES
let upperDisplay = document.getElementById('upper-display');
let lowerDisplay = document.getElementById('lower-display');

// EVAULUATION DICTIONARY & EQUATIONS
const evaluations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "x": (a, b) => a * b,
    "*": (a, b) => a * b,
    "/": (a, b) => b != "0" ? a / b : "ERR",
    "%": (a, b) => a % b
};

// GRABBING ELEMENTS
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const posNegButton = document.getElementById("pos-neg");
const equalsButton = document.getElementById("equals");
const pointButton = document.getElementById("point");

// ADDING EVENT LISTENERS
numbers.forEach(numberButton => {
    numberButton.addEventListener('click', () => numberInput(numberButton.textContent));
});

operators.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => operatorInput(operatorButton.textContent));
});

clearButton.addEventListener('click', () => clearFunction());
deleteButton.addEventListener('click', () => deleteFunction());
posNegButton.addEventListener('click', () => changeSign());
equalsButton.addEventListener('click', () => solveFunction(true));
pointButton.addEventListener('click', () => numberInput(pointButton.textContent));

document.addEventListener('keydown', (event) => keyboardInputFunc(event));

// KEYBOARD FUNCATIONALITY
function keyboardInputFunc(event) {

    event.preventDefault();
    let key = event.key;

    if (isNumber(key) || key === ".") {
        numberInput(key);
    } else if (key === "_") {
        changeSign();
    } else if (key in evaluations) {
        operatorInput(key);
    } else if (key === "=" || key === "Enter") {
        solveFunction(true);
    } else if (key === "Backspace" || key === "Delete") {
        deleteFunction();
    } else if (key === "Escape") {
        clearFunction();
    }

    
}

// Handles number inputs && decimals.
function numberInput(num) {

    if (resetReady) {
        clearFunction();
    }

    if (num === ".") {
        if (lowerDisplay.textContent.length == 0) {
            lowerDisplay.textContent = 0 + num;  

        } else if (!lowerDisplay.textContent.includes(".")) {
            lowerDisplay.textContent += num;

        }
    } else {
        lowerDisplay.textContent += num;

    }

    
}

// Handles operator input.
function operatorInput(op) {
    
    resetReady = false;
    solvedAnswer = "";

    // Is lowerDisplay.textContent defined but not valueOne?
    // If so move lowerDisplay.textContent into valueOne, 
    // then move valueOne into upperDisplay.textContent and concatenate operator.
    // then clear lowerDisplay.textContent.
    if (isNumber(lowerDisplay.textContent) && !isNumber(valueOne)) {
        valueOne = lowerDisplay.textContent;
        operator = op;
        lowerDisplay.textContent += " " + op;
  
        upperDisplay.textContent = lowerDisplay.textContent;
        lowerDisplay.textContent = "";
    
    // Is lowerDisplay.textContent and valueOne defined but not valueTwo?
    // If so we want to solve for valueOne and valueTwo.
    // then add the solvedAnswer and new operator to upperDisplay.textContent.
    // then more the solvedAnswer into valueOne, ready to be used again.
    } else if (isNumber(lowerDisplay.textContent) && !isNumber(valueTwo)) {
        solveFunction();
        operator = op;
        upperDisplay.textContent = solvedAnswer + " " + op;
        lowerDisplay.textContent = "";
        valueOne = solvedAnswer;

    // If the lowerDisplay.textContent is not defined but upperDisplay.textContent is,
    // then we just want to change the global operator var and change it in the upperDisplay.textContent.
    } else if (isNumber(upperDisplay.textContent) && !isNumber(lowerDisplay.textContent) && isNumber(valueOne)) {
        operator = op;
        upperDisplay.textContent = upperDisplay.textContent.slice(0, upperDisplay.textContent.length - 1) + " " + op;

    // This else just catches the small use case that if the user does a calculation, then fully deletes the answer.
    // IE: lowerDisplay.textContant === "", then the next number input will fully clear the calculator so that it will not 
    // display the newly typed numbers in the lowerDisplay. Which could cause confusion.
    } else {
        resetReady = true;
    }

}

// Clears the calculator.
function clearFunction() {

    upperDisplay.textContent = "";
    lowerDisplay.textContent = "";
    valueOne = "";
    valueTwo = "";
    solvedAnswer = "";
    operator = "";
    resetReady = false;
}

// Deletes the last entered numbers on the lower display.
function deleteFunction() {

    if (lowerDisplay.textContent.length > 0) {
        lowerDisplay.textContent = lowerDisplay.textContent.slice(0, lowerDisplay.textContent.length - 1)
       
        if (lowerDisplay.textContent.length = 0) {
            resetReady = true;
        }
    } 
}

// Changes the sign of the number.
function changeSign() {

    if (!isNumber(solvedAnswer)) {
        if (lowerDisplay.textContent[0] == "-") {
            lowerDisplay.textContent = lowerDisplay.textContent.slice(1);

        } else {
            lowerDisplay.textContent = "-" + lowerDisplay.textContent;

        }
    }
}

// Solves the equation.
function solveFunction(reset = false) {

    if (isNumber(valueOne) && isNumber(lowerDisplay.textContent)) {
        valueTwo = lowerDisplay.textContent;
        upperDisplay.textContent += " " + lowerDisplay.textContent;
        
        solvedAnswer = evaluations[operator](Number(valueOne), Number(valueTwo));
        solvedAnswer = +parseFloat(solvedAnswer).toFixed(7);
        lowerDisplay.textContent = solvedAnswer;

        valueOne = "";
        valueTwo = "";

        resetReady = reset;

    } else {
        // Nothing to solve.... yet!
    }
}

// Check to see if the param is a number or not. Normally an empty string if not.
function isNumber(check) {

    return !isNaN(parseInt(check));
}

