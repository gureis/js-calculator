function writeOnDisplay(value) {
    if (isNewNumber) {
        resetDisplayContent();
        isNewNumber = false;
        isNewOperation = !isNewOperation;
    }
    if (display.textContent.length < 32) {
        display.textContent = display.textContent.replace(/^0+/, '');
        display.textContent += value;
    }
}

function writeDotOnDisplay() {
    display.textContent = display.textContent.replace(/^0+/, '');
    if (!hasDot) {
        if(isNewNumber) {
            resetDisplayContent();
            isNewNumber = !isNewNumber;
        }
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
    if (result !== null) {
        display.textContent = parseFloat(result.toFixed(5));
    }
}

function clearDisplay() {
    if (isSoftClear) {
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

//KEYBOARD FUNCTIONS

document.addEventListener('keyup', function (event) {
    const validKey = event.key;

    if (isValidNumber(validKey)) {
        writeOnDisplay(parseInt(validKey));
    } else if (isValidOperatorKey(validKey)) {
        setOperator(validKey);
    } else if (isValidEqualKey(validKey)) {
        equalOperation();
    } else if (isValidDotKey(validKey)) {
        writeDotOnDisplay();
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

function isValidOperatorKey(operatorKey) {
    if (operatorKey === '+' || operatorKey === '-' || operatorKey === '/' || operatorKey === '*') {
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
    if (dot === '.' || dot === ',') {
        return true;
    }
    return false;
}

function isValidClearKey(clearKey) {
    if (clearKey === 'Backspace' || clearKey.toUpperCase() === 'C') {
        return true;
    }
    return false;
}
