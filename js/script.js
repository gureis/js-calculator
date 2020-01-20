let display = document.querySelector(".display");
let leftOperand = null;
let rightOperand = null;
let result = null;
let operation = null;
let hasDot = false;
let isNewNumber = false;
let isSoftClear = false;

function writeNumber(value) {
    let newValue = "";
    if(isNewNumber) {
        display.innerHTML = value;
        newValue = value;
        isNewNumber = false;
    } else {
        newValue = display.innerHTML + value;
        display.innerHTML = newValue.replace(/^0+/, '');
    }
    if (operation === null) {
        leftOperand = newValue;
    } else {
        rightOperand = newValue;
    }
    isSoftClear = false;
}

function clearDisplay() {
    if(isSoftClear) {
        leftOperand = null;
        rightOperand = null;
        result = null;
        hasDot = false;
        operation = null;
    } else {
        rightOperand = 0;
    }
    isSoftClear = !isSoftClear;
    display.innerHTML = "0";
}

function setOperation(localOperation) {
    display.innerHTML = '0';
    hasDot = false;
    operation = localOperation;
    if(rightOperand) {
        executeOperation();
        isNewNumber = true;
    }
}

function executeOperation() {
    leftOperand = parseFloat(leftOperand);
    rightOperand = parseFloat(rightOperand);
    switch (operation) {
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
        hasDot = true;
    }
}

function showResult() {

}