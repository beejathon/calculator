const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    return a / b;
}

const percent = function(a) {
    return a / 100;
}

function input(e) {
    if (!isNaN(e.target.id)) {
        operands.unshift(parseInt(`${e.target.id}`));
        currentValue.textContent = parseInt(`${e.target.id}`);
    } else if (e.target.id == 'equals') {
        operate();
    } else {
        operators.unshift(`${e.target.id}`);
    }

}

function operate() {
    let result;
    if (operators[0] == '+') result = add(operands[1], operands[0]);
    if (operators[0] == '-') result = subtract(operands[0], operands[1]);
    if (operators[0] == '*') result = multiply(operands[0], operands[1]);
    if (operators[0] == '/') result = divide(operands[0], operands[1]);
    currentValue.textContent = result;
}

const operands = [];
const operators = [];
const equation = document.querySelector('#equation');
equation.textContent = '';
const currentValue = document.querySelector('#currentValue');
currentValue.textContent = '';

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', input))

/*
const allClr = document.querySelector('#all-clr');
const clrEntry = document.querySelector('#clr-entry');
const addition = document.querySelector('#add');
const subtraction = document.querySelector('#subtract');
const multiplication = document.querySelector('#multiply');
const division = document.querySelector('#divide');
const percentage = document.querySelector('#percent');
const decimal = document.querySelector('#decimal');
const one = document.querySelector('#one');
const two = document.querySelector('#two');
const three = document.querySelector('#three');
const four = document.querySelector('#four');
const five = document.querySelector('#five');
const six = document.querySelector('#six');
const seven = document.querySelector('#seven');
const eight = document.querySelector('#eight');
const nine = document.querySelector('#nine');
const zero = document.querySelector('#zero');
const equals = document.querySelector('#equals');
*/

