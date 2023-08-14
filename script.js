let valueOne = "";
let valueTwo = "";
let operator = "";

let upperDisplay = document.getElementById('upper-display');
let lowerDisplay = document.getElementById('lower-display');

upperDisplay.textContent = "";
lowerDisplay.textContent = "";

const numbers = document.querySelectorAll('.number');
numbers.forEach(numberButton => {
    numberButton.addEventListener('click', () => numberInput(numberButton.textContent));
});

const operators = document.querySelectorAll('.operator');
operators.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => operatorInput(operatorButton.textContent));
});

const clearButton = document.getElementById("clear");
clearButton.addEventListener('click', () => clearFunction());

const posNegButton = document.getElementById("pos-neg");
posNegButton.addEventListener('click', () => changeSign());

const equalsButton = document.getElementById("equals");
const pointButton = document.getElementById("point");


function numberInput(num) {
    console.log(num);
    lowerDisplay.textContent += num;
}

function operatorInput(operator) {
    console.log(operator);
    lowerDisplay.textContent += " " + operator;
    upperDisplay.textContent = lowerDisplay.textContent;
    lowerDisplay.textContent = "";
}

function clearFunction() {
    upperDisplay.textContent = "";
    lowerDisplay.textContent = "";
}

function changeSign() {
    if (lowerDisplay.textContent[0] == "-") {
        lowerDisplay.textContent = lowerDisplay.textContent.slice(1);
        lowerDisplay.style.color = "black";
    } else {
        lowerDisplay.textContent = "-" + lowerDisplay.textContent;
        lowerDisplay.style.color = "red";
    }
}

