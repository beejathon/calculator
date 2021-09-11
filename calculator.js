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
        equationArray.splice(equationArray.length-1, 1, parseFloat(inputBuffer.join('')));
        currentValue.textContent = inputBuffer.join('');
        equation.textContent = equationArray.join(' ');
        lastInput = 'dec';
        return;
    } else if (inputBuffer.length >= 1) {
        inputBuffer.push(parseFloat(e.target.id));
        operands.splice(0, 1, parseFloat(inputBuffer.join('')));
        equationArray.splice(equationArray.length-1, 1, parseFloat(inputBuffer.join('')));
        currentValue.textContent = inputBuffer.join('');
        equation.textContent = equationArray.join(' ');
        lastInput = 'num';
        return;
    } else {
        inputBuffer.push(parseFloat(e.target.id))
        operands.unshift(parseFloat(e.target.id));
        equationArray.push(parseFloat(inputBuffer.join('')));
        currentValue.textContent = parseFloat(inputBuffer.join(''));
        equation.textContent = equationArray.join(' ');
        lastInput = 'num';
    }
}

const inputOp = (e) => {
    if (lastInput == 'op') return;
    if (operands.length >= 2) {
        operators.unshift(e.target.id);
        equationArray.push(e.target.id);
        inputBuffer.splice(0);
        operate();
        equation.textContent = equationArray.join(' ');
    } else {
        operators.unshift(e.target.id);
        equationArray.push(e.target.id);
        inputBuffer.splice(0);
        equation.textContent = equationArray.join(' ');
    }
    lastInput = 'op';
}

const inputEquals = (e) => {
    operate();
    operands.splice(1, (operands.length -1))
    operators.splice(0);
    inputBuffer.splice(0);
    equation.textContent = equationArray.join(' ');
    lastInput = 'num';
    return;
}

const inputSpcl = (e) => {
    if (e.target.id == 'all-clr') {
        operands.splice(0);
        operators.splice(0);
        equationArray.splice(0);
        inputBuffer.splice(0);
        currentValue.textContent = ' ';
        equationArray.textContent = ' ';
        lastInput = 'spcl';
    } else if (e.target.id == 'clr-entry' && inputBuffer.length == 0) {
        return;
    } else if (e.target.id == 'clr-entry' && lastInput == 'op') {
        operators.shift();
        equationArray.pop();
        lastInput = 'num';
    } else if (e.target.id == 'clr-entry' && (lastInput == 'num' || lastInput == 'dec')) {
        inputBuffer.pop();
        operands.splice(0, 1, parseFloat(inputBuffer.join('')));
        equationArray.splice(equationArray.length-1, 1, parseFloat(inputBuffer.join('')));
        currentValue.textContent = parseFloat(inputBuffer.join(''));
        equation.textContent = equationArray.join(' ');
        lastInput = 'num';
    }
}

function operate() {
    let result;
    if (operators[0] == '/' && operands[0] == 0) {
        currentValue.textContent = 'WE LIVE IN A SOCIETY';
        equation.textContent = equationArray.join(' ');
        return;
    }
    if (operators[0] == '+') result = add(operands[1], operands[0]);
    if (operators[0] == '-') result = subtract(operands[1], operands[0]);
    if (operators[0] == '*') result = multiply(operands[1], operands[0]);
    if (operators[0] == '/') result = divide(operands[1], operands[0]);
    if (operators[0] == '%') result = percent(operands[0]);
    operands.unshift(round(parseFloat(result), 15));
    currentValue.textContent = round(parseFloat(result), 15);
    equation.textContent = equationArray.join(' ');
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

const operands = [];
const operators = [];
const equationArray = [];
const inputBuffer = [];
let lastInput;

const equation = document.getElementById('equation');
equation.textContent = '';
const currentValue = document.getElementById('currentValue');
currentValue.textContent = '';


const numBtns = document.querySelectorAll('.num');
numBtns.forEach(numBtn => numBtn.addEventListener('click', inputNum));
const opBtns = document.querySelectorAll('.op');
opBtns.forEach(opBtn => opBtn.addEventListener('click', inputOp));
const equalsBtn = document.getElementById('equals');
equalsBtn.addEventListener('click', inputEquals);
const spclBtns = document.querySelectorAll('.spcl');
spclBtns.forEach(spclBtn => spclBtn.addEventListener('click', inputSpcl));