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
    if(isHardClear) {
        document.querySelector('#clear-display-button').textContent = 'CE';
    } else {
        document.querySelector('#clear-display-button').textContent = 'C';
    }
}

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
    isHardClear = false;
    defineClearText();
}

function clearDisplay() {
    if (isHardClear) {
        leftOperand = null;
        rightOperand = null;
        result = null;
        hasDot = false;
        operator = null;
    } else {
        rightOperand = null;
        isNewNumber = !isNewNumber;
    }
    isHardClear = !isHardClear;
    display.innerHTML = "0";
    defineClearText();
}

// Teclas do teclado precisam funcionar
// 5 + 3 = 8 /, repetir, pq tem erro
// limitar numero de char

//trocar resultado no segundo click depois de mudar o numero (isso é realmente um erro?)

//testar 3 - -3 -> DONE
// Tirar o switch, substituir por operation['name'] = function --> DONE -> mas no fim, nem usou
// arrumar erro do C --> ACHO QUE DONE
// segundo click do = --> DONE
// Operador mudado não deveria calcular nada, exemplo 6 + 6 *. --> DONE
// -6 -6 - 8 tem erro, resolve essa parada --> DONE
function setOperator(localOperator) {
    if(isNewNumber && localOperator == 'subtract') {
        writeNumber('-');
    }
    else {
        if (rightOperand !== null ) {
            executeOperation();
        }
        // display.innerHTML = '0';
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
    defineClearText();
}

function writeDot() {
    if (!hasDot) {
        display.innerHTML = display.innerHTML.replace(/^0+/, '');
        display.innerHTML += ".";
        isNewNumber = !isNewNumber;
        hasDot = true;
    }
}

document.addEventListener('keyup', function (event) {

    const validKey = event.key;
    console.log(event);

    if(!isNaN(parseInt(validKey))) {
        writeNumber(parseInt(validKey));
    } else if(isValidOperatornKey(validKey)) {
        setOperator(validKey);
    } else if(isValidEqualKey(validKey)) {
        executeOperation();
    }
});

function isValidOperatornKey(operation) {
    if(operation === '+' || operation === '-' || operation === '/' || operation === '+') {
        return true;
    }
    return false;
}

function isValidEqualKey(key) {
    if(key === ' ') {
        return true;
    }
}