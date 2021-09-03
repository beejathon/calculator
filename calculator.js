const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const percent = (a) => a / 100;

const inputNum = (e) => {
    operands.unshift(parseInt(`${e.target.id}`));
    equationArray.unshift(parseInt(`${e.target.id}`));
    currentValue.textContent = parseInt(`${e.target.id}`);
    lastInput = 'num'
}

const inputOp = (e) => {
    if (lastInput == 'op') return;
    operators.unshift(e.target.id);
    equationArray.unshift(e.target.id);
    lastInput = 'op'
}

const inputSpcl = (e) => {
    if (e.target.id == 'equals') {
        operate();
    } else if (e.target.id == 'all-clr') {
        operands.splice(0, operands.length);
        operators.splice(0, operators.length);
        equationArray.splice(0, equationArray.length);
        currentValue.textContent = '';
        equationArray.textContent = '';
    }
    lastInput = 'spcl'
}

function operate() {
    let result;
    if (operators[0] == '+') result = add(operands[1], operands[0]);
    if (operators[0] == '-') result = subtract(operands[1], operands[0]);
    if (operators[0] == '*') result = multiply(operands[1], operands[0]);
    if (operators[0] == '/') result = divide(operands[1], operands[0]);
    operands.splice(0, 1, result);
    currentValue.textContent = result;
}

const operands = [];
const operators = [];
const equationArray = [];
const equation = document.querySelector('#equation');
equation.innerText = equationArray;
const currentValue = document.querySelector('#currentValue');
currentValue.textContent = '';
let lastInput;

const numButtons = document.querySelectorAll('.num');
numButtons.forEach(numButton => numButton.addEventListener('click', inputNum));
const opButtons = document.querySelectorAll('.op');
opButtons.forEach(opButton => opButton.addEventListener('click', inputOp));
const spclButtons = document.querySelectorAll('.spcl');
spclButtons.forEach(spclButton => spclButton.addEventListener('click', inputSpcl))