let display = document.querySelector(".display");
let leftOperand = null;
let rightOperand = null;
let savedRightOperand = null;
let result = null;
let operator = null;

//flags
let hasDot = false;
let isNewNumber = true;
let isHardClear = false;

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
}

// limitar numero de char
// Tirar o switch, substituir por operation['name'] = function
// Teclas do teclado precisam funcionar

//trocar resultado no segundo click

// arrumar erro do C --> ACHO QUE DONE
// segundo click do = --> DONE
// Operador mudado não deveria calcular nada, exemplo 6 + 6 *. --> DONE
// -6 -6 - 8 tem erro, resolve essa parada --> DONE
function setOperator(localOperator) {
    if(isNewNumber && localOperator == 'SUB' && operator !== 'SUB') {
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
    savedRightOperand = rightOperand;
    rightOperand = null;
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