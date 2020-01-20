let display = document.querySelector(".display");
let leftOperand = null;
let rightOperand = null;
let result = null;
let operator = null;
let hasDot = false;
let isNewNumber = true;
let isSoftClear = false;

function writeNumber(value) {
    let newValue = "";
    if (isNewNumber) {
        display.innerHTML = value;
        newValue = value;
        isNewNumber = !isNewNumber;
    } else {
        newValue = display.innerHTML + value;
        display.innerHTML = newValue.replace(/^0+/, '');
    }
    if (operator === null) {
        leftOperand = newValue;
    } else {
        rightOperand = newValue;
    }
    isSoftClear = false;
}

function clearDisplay() {
    if (isSoftClear) {
        leftOperand = null;
        rightOperand = null;
        result = null;
        hasDot = false;
        operator = null;
    } else {
        rightOperand = 0;
    }
    isSoftClear = !isSoftClear;
    display.innerHTML = "0";
}

function setOperator(localOperator) {
    if (isNewNumber && localOperator == 'SUB') {
        writeNumber('-');
    } else {
        display.innerHTML = '0';
        hasDot = false;
        operator = localOperator;
        isNewNumber = !isNewNumber;
        if (rightOperand) {
            executeOperation();
        }
    }
}

function executeOperation() {
    leftOperand = parseFloat(leftOperand);
    rightOperand = parseFloat(rightOperand);
    switch (operator) {
        case 'ADD':
            add();
            break;
        case 'SUB':
            sub();
            break;
        case 'DIV':
            div();
            break;
        case 'MUL':
            mul();
            break;
        default:
            console.log('Operação não existente');
            break;
    }
    leftOperand = result;
    display.innerHTML = Number(result.toFixed(8));
    isNewNumber = true;
}

function add() {
    result = leftOperand + rightOperand;
}

function sub() {
    result = leftOperand - rightOperand;
}

function div() {
    result = leftOperand / rightOperand;
}

function mul() {
    result = leftOperand * rightOperand;
}

function writeDot() {
    if (!hasDot) {
        display.innerHTML = display.innerHTML.replace(/^0+/, '');
        display.innerHTML += ".";
        isNewNumber = !isNewNumber;
        hasDot = true;
    }
}

function showResult() {

}