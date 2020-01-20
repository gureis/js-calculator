let display = document.querySelector(".display");
let leftOperand = null;
let rightOperand = null;
let result = 0;
let hasDot = false;
let operation = null;

function writeNumber(value) {
    let newValue = display.innerHTML + value;
    display.innerHTML = newValue.replace(/^0+/, '');
    if (operation === null) {
        leftOperand = newValue;
    } else {
        rightOperand = newValue;
    }
}

function clearDisplay() {
    leftOperand = null;
    rightOperand = null;
    result = 0;
    hasDot = false;
    operation = null
    display.innerHTML = "0";
}

function setOperation(localOperation) {
    operation = localOperation;
    display.innerHTML = '0';
}

function executeOperation() {
    leftOperand = parseFloat(leftOperand);
    rightOperand = parseFloat(rightOperand);
    switch (operation) {
        case 'ADD':
            add();
            break;
        case 'SUB':
            break;
        case 'DIV':

            break;
        case 'MUL':

            break;
        default:
            console.log('Operação não existente');
            break;
    }
}

function add() {
    result = leftOperand + rightOperand;
    display.innerHTML = result;
    leftOperand = result;
}

function writeDot() {
    if (!hasDot) {
        display.innerHTML += ".";
        hasDot = true;
    }
}

function showResult() {

}