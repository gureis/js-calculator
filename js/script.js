const display = document.querySelector(".display");
let leftOperand = null;
let rightOperand = null;
let savedRightOperand = null;
let result = null;
let operator = null;

//flags
let hasDot = false;
let isNewNumber = true;
let isHardClear = false;
let isNewOperation = true;

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


function defineClearText() {
    if (isHardClear) {
        document.querySelector('#clear-display-button').textContent = 'CE';
    } else {
        document.querySelector('#clear-display-button').textContent = 'C';
    }
}

// function writeNumber(value) {
//     let newValue = "";
//     if (isNewNumber) {
//         display.innerHTML = value;
//         newValue = value;
//         isNewNumber = !isNewNumber;
//     } else {
//         newValue = display.innerHTML + value;
//         display.innerHTML = newValue.replace(/^0+/, '');
//     }
//     if (operator === null) {
//         leftOperand = newValue;
//     } else {
//         rightOperand = newValue;
//     }
//     isHardClear = false;
//     defineClearText();
// }

function writeNumber(value) {
    if (isNewNumber) {
        display.innerHTML = value;
        newValue = value;
        isNewNumber = !isNewNumber;
    } else {
        newValue = display.innerHTML + value;
        display.innerHTML = newValue.replace(/^0+/, '');
    }
}



function clearDisplay() {
    if (isHardClear) {
        leftOperand = null;
        rightOperand = null;
        savedRightOperand = null;
        result = null;
        operator = null;
        //flags
        hasDot = false;
        isNewNumber = true;
        isHardClear = false;
    } else {
        rightOperand = null;
        isNewNumber = !isNewNumber;
        isHardClear = true;
    }
    display.innerHTML = "0";
    defineClearText();
}

function setOperator(localOperator) {
    if (isNewNumber && localOperator == '-') {
        writeNumber('-');
    }
    else {
        if (rightOperand !== null) {
            executeOperation();
        }
        hasDot = false;
        operator = localOperator;
        isNewNumber = true;
    }
}

function executeOperation() {
    leftOperand = parseFloat(leftOperand);
    rightOperand = (rightOperand !== null) ? parseFloat(rightOperand) : savedRightOperand;
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
    leftOperand = result;
    savedRightOperand = rightOperand;
    rightOperand = null;
    display.innerHTML = Number(result.toFixed(8));
    isNewNumber = true;
}

function writeDot() {
    if (!hasDot) {
        display.innerHTML = display.innerHTML.replace(/^0+/, '');
        display.innerHTML += ".";
        hasDot = true;
    }
}

document.addEventListener('keyup', function (event) {
    const validKey = event.key;
    console.log(event);

    if (isValidNumber(validKey)) {
        writeNumber(parseInt(validKey));
    } else if (isValidOperatorKey(validKey)) {
        setOperator(validKey);
    } else if (isValidEqualKey(validKey)) {
        executeOperation();
    } else if (isValidDotKey(validKey)) {
        writeDot();
    } else if (isValidClearKey(validKey)) {
        clearDisplay();
    }
});

function isValidNumber(number) {
    if (!isNaN(parseInt(number))) {
        return true;
    }
    return false;
}

function isValidOperatorKey(operation) {
    if (operation === '+' || operation === '-' || operation === '/' || operation === '*') {
        return true;
    }
    return false;
}

function isValidEqualKey(key) {
    if (key === ' ' || key === 'Enter' || key === '=') {
        return true;
    }
    return false;
}

function isValidDotKey(dot) {
    if (dot === '.') {
        return true;
    }
    return false;
}

function isValidClearKey(backspace) {
    if (backspace === 'Backspace') {
        return true;
    }
    return false;
}