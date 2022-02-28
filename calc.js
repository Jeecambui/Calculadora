'use strict'

const display = document.getElementById('display');
const numbers = document.querySelectorAll('[id*=key]');
const operators = document.querySelectorAll('[id*=op]');

let newNum = true;
let operator;
let numberPrev;

const pendingOp = () => operator !== undefined;


//calculo
const calc = () =>{
    if (pendingOp()){
        const numCurrent = parseFloat(display.textContent.replace(',','.'));
        newNum = true;

        // forma ágil
        const result = eval (`${numberPrev}${operator}${numCurrent}`);
        updateDisplay(result);

        // outra forma
        /*if(operator == '+'){
            updateDisplay(numberPrev + numCurrent);
        }else if(operator == '-'){
            updateDisplay(numberPrev - numCurrent);
        }else if(operator == '*'){
            updateDisplay(numberPrev * numCurrent);
        }else if(operator == '/'){
            updateDisplay(numberPrev / numCurrent);
        }*/
    }
}

const updateDisplay = (text) => {
    if(newNum){
        display.textContent = text.toLocaleString('BR');
        newNum = false;
    }else{
        display.textContent += text.toLocaleString('BR');
    }
}


const insertNum = (event) => updateDisplay(event.target.textContent);
numbers.forEach(num => num.addEventListener('click', insertNum));

const selectOperator = (event) => {
    if (!newNum) {
        calc()
        newNum = true;
        operator = event.target.textContent;
        numberPrev = parseFloat(display.textContent);
        numberPrev = parseFloat(display.textContent.replace(',','.'));
    }
}
operators.forEach(operator => operator.addEventListener('click', selectOperator));


const actEqual = () => {
    calc();
    operator = undefined;
}
document.getElementById('equal').addEventListener('click', actEqual);


const clearDisp = () => display.textContent = '';
document.getElementById('clearDisp').addEventListener('click', clearDisp);

const clearCalc = () => {
    clearDisp();
    operator = undefined;
    newNum = true; 
    numberPrev = undefined;    
}
document.getElementById('clearCalc').addEventListener('click', clearCalc);

const removeLast = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removeLast);

const invertSignal = () => {
    newNum = true;
    updateDisplay (display.textContent * -1);
}
document.getElementById('invert').addEventListener('click', invertSignal);


const existDecimal = () => display.textContent.indexOf(',') !== -1;
const existValue = () => display.textContent.length > 0;
const insertDecimal = () => {
    if (!existDecimal()){
        if (existValue()){
            updateDisplay(',');
        }else{
            updateDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', insertDecimal);


//Digitar pelo teclado:
const mapKey = {
    '0' : 'key0',
    '1' : 'key1',
    '2' : 'key2',
    '3' : 'key3',
    '4' : 'key4',
    '5' : 'key5',
    '6' : 'key6',
    '7' : 'key7',
    '8' : 'key8',
    '9' : 'key9',
    '0' : 'key0',
    '/' : 'opDiv',
    '*' : 'opMul',
    '-' : 'opSub',
    '+' : 'opPlu',
    '=' : 'equal',
    'Enter' : 'equal',
    'Backspace' : 'backspace',
    'c' : 'clearDisp',
    'Escape' : 'clearCalc',
    ',' : 'decimal',

}
const mappedKey = (event) => {
    const key = event.key;

    const keyAllow = () => Object.keys(mapKey).indexOf(key) !== -1;
    if (keyAllow()) document.getElementById(mapKey[key]).click();
    
}
document.addEventListener('keydown', mappedKey);