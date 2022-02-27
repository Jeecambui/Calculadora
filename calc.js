'use strict'

const display = document.getElementById('display');
const numbers = document.querySelectorAll('[id*=key]');
const operators = document.querySelectorAll('[id*=op]');

let newNum = true;
let operator;
let numberPrev;

const pendingOp = () => operator !== undefined;

const calc = () =>{
    if (pendingOp()){
        const numCurrent = parseFloat(display.textContent);
        newNum = true;

        // forma ágil
        /*const result = eval (`${numPrev}${operator}${numCurrent}`);
        updateDisplay(result);
        */
        // forma complexa
        if(operator == '+'){
            updateDisplay(numberPrev + numCurrent);
        }else if(operator == '-'){
            updateDisplay(numberPrev - numCurrent);
        }else if(operator == '*'){
            updateDisplay(numberPrev * numCurrent);
        }else if(operator == '/'){
            updateDisplay(numberPrev / numCurrent);
        }
    }
}

const updateDisplay = (text) => {
    if(newNum){
        display.textContent = text;
        newNum = false;
    }else{
        display.textContent += text;
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