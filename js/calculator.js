const display = document.querySelector('.display');;

let operator = null;
let leftOperand = null;
let rightOperand = null;
let result = null;

let hasDot = false;
let isSoftClear = true;
let isNewNumber = true;
let isNewOperation = true;
let hasOperator = false;

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
        hasOperator = false;
    }
}

function setOperator(localOperator) {
    if (!displayNegativeNumber(localOperator)) {
        resetOnNewOperation();
        if (!hasOperator) {
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
        }
        isNewNumber = true;
        operator = localOperator;
        hasOperator = true;
        displaySelectedOperator(operator);
        hasDot = false;
    }
}

function equalOperation() {
    if (leftOperand !== null && (leftOperand !== '-')) {
        if (rightOperand) {
            executeOperation();
            leftOperand = result;
        } else if (rightOperand === null) {
            rightOperand = getDisplayNumber();
            if (isNaN(rightOperand)) {
                rightOperand === null;
                return;
            }
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

