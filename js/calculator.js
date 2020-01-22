const display = document.querySelector('.display');;

let operator = null;
let leftOperand = null;
let rightOperand = null;
let result = null;

let hasDot = false;
let isSoftClear = true;
let isNewNumber = true;

// DISPLAY LOGIC GOES HERE

function writeOnDisplay(value) {
    if(isNewNumber) {
        resetDisplayContent();
        isNewNumber = false;
    }
    display.textContent = display.textContent.replace(/^0+/, '');
    display.textContent += value;
}

function writeDotOnDisplay() {
    display.textContent = display.textContent.replace(/^0+/, '');
    if(!hasDot) {
        display.textContent += '.';
        hasDot = !hasDot;
    }
}

function getDisplayNumber() {
    const displayNumber = parseFloat(display.textContent);
    return displayNumber;
}

function resetDisplayContent() {
    display.textContent = '0';
}

function defineClearText() {
    if (isSoftClear) {
        document.querySelector('#clear-display-button').textContent = 'C';
    } else {
        document.querySelector('#clear-display-button').textContent = 'CE';
    }
}

function displayResult() {
    if(result !== null) {
        display.textContent = result;
    }
}

function clearDisplay() {
    if(isSoftClear) {
        hasDot = false;
    } else {
        operator = null;
        leftOperand = null;
        rightOperand = null;
        result = null;

        hasDot = false;
    }
    resetDisplayContent();
    isSoftClear = !isSoftClear;
    defineClearText();
}

function displayNegativeNumber(localOperator) {
    if (isNewNumber && localOperator == '-') {
        writeOnDisplay('-');
        return true;
    }
    return false;
}

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

function setOperator(localOperator) {
    if (!displayNegativeNumber(localOperator)) {
        if(leftOperand) {
            if(rightOperand === null) {
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
        isNewNumber = true;
    }
}

function equalOperation() {
    if(leftOperand) {
        if(rightOperand) {
            executeOperation();
            leftOperand = result;
        } else if(rightOperand === null) {
            rightOperand = getDisplayNumber();
            executeOperation();
            leftOperand = result;
        }
        displayResult();
        isNewNumber = true;
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