const display = document.querySelector('.display');;

let operator = null;
let leftOperand = null;
let rightOperand = null;
let result = null;

let hasDot = false;
let isSoftClear = true;
let isNewNumber = true;
let isNewOperation = true;

//LOGIC GOES HERE

function add() {
    result = leftOperand + rightOperand;
}
function subtract() {
    result = leftOperand - rightOperand;
}
function divide() {
    result = leftOperand / rightOperand;
}
function multiply() {
    result = leftOperand * rightOperand;
}

function resetOnNewOperation() {
    if (isNewOperation) {
        leftOperand = null;
        rightOperand = null;
        result = null;
        isNewOperation = !isNewOperation;
    }
}

function setOperator(localOperator) {
    if (!displayNegativeNumber(localOperator)) {
        resetOnNewOperation();
        if(isNewOperation) {
            resetOnNewOperation();
        }
        if (leftOperand) {
            if (rightOperand === null) {
                rightOperand = getDisplayNumber();
                executeOperation();
                leftOperand = result;
                rightOperand = null;
                displayResult();
            }
        } else {
            leftOperand = getDisplayNumber();
            rightOperand = null;
        }
        operator = localOperator;
        displaySelectedOperator(operator);
        isNewNumber = true;
        hasDot = false;
    }
}

function equalOperation() {
    if (leftOperand !== null && leftOperand !== '-') {
        if (rightOperand) {
            executeOperation();
            leftOperand = result;
        } else if (rightOperand === null) {
            rightOperand = getDisplayNumber();
            executeOperation();
            leftOperand = result;
        }
        removeSelectedOperator();
        displayResult();
        isNewNumber = true;
        hasDot = false;
        isNewOperation = true;
    }
}

function executeOperation() {
    switch (operator) {
        case '+':
            add();
            break;
        case '-':
            subtract();
            break;
        case '/':
            divide();
            break;
        case '*':
            multiply();
            break;
        default:
            console.log('Operação não existente');
            break;
    }
}

