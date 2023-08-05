let valueOne = "";
let valueTwo = "";

let upperDisplay = document.getElementById('upper-display');
let lowerDisplay = document.getElementById('lower-display');

upperDisplay.textContent = " ";
lowerDisplay.textContent = " ";

const numbers = document.querySelectorAll('.number');
numbers.forEach(numberButton => {
    numberButton.addEventListener('click', () => numberInput(numberButton.textContent));
});

const operators = document.querySelectorAll('.operator');
operators.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => operatorInput(operatorButton.textContent));
});

const clearButton = document.getElementById("clear");
const negPosButton = document.getElementById("neg-pos");
const modButton = document.getElementById("mod");
const divideButton = document.getElementById("divide");
const multiButton = document.getElementById("multiply");
const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const equalsButton = document.getElementById("equals");
const pointButton = document.getElementById("point");

// console.log(clearButton.textContent);
// console.log(negPosButton.textContent);
// console.log(modButton.textContent);
// console.log(divideButton.textContent);
// console.log(multiButton.textContent);
// console.log(minusButton.textContent);
// console.log(plusButton.textContent);
// console.log(equalsButton.textContent);
// console.log(pointButton.textContent);

function numberInput(num) {
    console.log(num);
    lowerDisplay.textContent += num;
}

function operatorInput(operator) {
    console.log(operator);
    lowerDisplay.textContent += operator;
}


