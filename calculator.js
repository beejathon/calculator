const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const percent = (a) => a / 100;

const inputNum = (e) => {
    const checkDec = (entry) => entry == '.';
    const decCheck = inputBuffer.some(checkDec);
    if (e.target.id == '.' && decCheck) {
        return;
    } else if (e.target.id == '.' && lastInput == 'num' && !decCheck) {
        inputBuffer.push(e.target.id);
        operands.splice(0, 1, parseFloat(inputBuffer.join('')));
        equationArray.splice(0, 1, parseFloat(inputBuffer.join('')));
        currentValue.textContent = inputBuffer.join('');
        equation.textContent = equationArray.reverse().join(' ');
        lastInput = 'dec';
        return;
    } else if (inputBuffer.length >= 1) {
        inputBuffer.push(parseFloat(e.target.id));
        operands.splice(0, 1, parseFloat(inputBuffer.join('')));
        equationArray.splice(0, 1, parseFloat(inputBuffer.join('')));
        currentValue.textContent = inputBuffer.join('');
        equation.textContent = equationArray.reverse().join(' ');
        lastInput = 'num';
        return;
    } else {
        inputBuffer.push(parseInt(e.target.id))
        operands.unshift(parseInt(e.target.id));
        equationArray.unshift(e.target.id);
        currentValue.textContent = parseFloat(inputBuffer.join(''));
        equation.textContent = equationArray.reverse().join(' ');
        lastInput = 'num';
    }
}

const inputOp = (e) => {
    if (lastInput == 'op') return;
    if (e.target.id == '%') {
        operators.unshift(e.target.id);
        equationArray.unshift(e.target.id);
        inputBuffer.splice(0, inputBuffer.length);
        operate();
        lastInput = 'spcl';
        return;
    } else if (operands.length >=2 && lastInput == 'spcl') {
        operators.unshift(e.target.id);
        equationArray.unshift(e.target.id);
        inputBuffer.splice(0, inputBuffer.length);
        lastInput = 'op';
    } else if (operands.length >= 2) {
        operators.unshift(e.target.id);
        equationArray.unshift(e.target.id);
        inputBuffer.splice(0, inputBuffer.length);
        operate();
        lastInput = 'op';
    }
}

const inputSpcl = (e) => {
    if (e.target.id == 'equals' && lastInput == 'num') {
        operate();
        operands.splice(1, (operands.length -1))
        operators.splice(0, operators.length);
        inputBuffer.splice(0, inputBuffer.length);
        equation.textContent = equationArray.reverse().join(' ');
        lastInput = 'num';
        return;
    } else if (e.target.id == 'all-clr') {
        operands.splice(0, operands.length);
        operators.splice(0, operators.length);
        equationArray.splice(0, equationArray.length);
        inputBuffer.splice(0, inputBuffer.length);
        currentValue.textContent = '';
        equationArray.textContent = '';
        lastInput = 'spcl';
    } else if (e.target.id == 'clr-entry' && lastInput == 'op') {
        operators.shift();
        equationArray.shift();
        lastInput = 'num';
    } else if (e.target.id == 'clr-entry' && lastInput =='num') {
        inputBuffer.shift();
        operands.splice(0, 1, parseFloat(inputBuffer.join('')));
        equationArray.splice(0, 1, parseFloat(inputBuffer.join('')));
        currentValue.textContent = parseFloat(inputBuffer.join(''));
        equation.textContent = equationArray.reverse().join(' ');
        lastInput = 'num';
    }
}

function operate() {
    let result;
    if (operators[0] == '/' && operands[0] == 0) {
        currentValue.textContent = 'WE LIVE IN A SOCIETY';
        equation.textContent = equationArray.reverse().join(' ');
        return;
    }
    if (operators[0] == '+') result = add(operands[1], operands[0]);
    if (operators[0] == '-') result = subtract(operands[1], operands[0]);
    if (operators[0] == '*') result = multiply(operands[1], operands[0]);
    if (operators[0] == '/') result = divide(operands[1], operands[0]);
    if (operators[0] == '%') result = percent(operands[0]);
    operands.unshift(round(parseFloat(result), 15));
    currentValue.textContent = round(parseFloat(result), 15);
    equation.textContent = equationArray.reverse().join(' ');
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

const operands = [];
const operators = [];
const equationArray = [];
const inputBuffer = []
let lastInput;

const equation = document.querySelector('#equation');
equation.textContent = '';
const currentValue = document.querySelector('#currentValue');
currentValue.textContent = '';


const numButtons = document.querySelectorAll('.num');
numButtons.forEach(numButton => numButton.addEventListener('click', inputNum));
const opButtons = document.querySelectorAll('.op');
opButtons.forEach(opButton => opButton.addEventListener('click', inputOp));
const spclButtons = document.querySelectorAll('.spcl');
spclButtons.forEach(spclButton => spclButton.addEventListener('click', inputSpcl))