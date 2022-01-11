const numberBtn = document.querySelectorAll('[data-num]');
const operatorBtn = document.querySelectorAll('[data-operator]');
const clearBtn = document.getElementById('clearBtn');
const delBtn = document.getElementById('deleteBtn');
const decimalBtn = document.getElementById('decimalBtn');
const equalBtn = document.getElementById('equalBtn');
const screenText = document.getElementById('screenText');

let num1 = '';
let num2 = '';
let currentOp = null;
let resetNextInput = false;

numberBtn.forEach(function(btn){
    btn.addEventListener('click', () => appendInput(btn.textContent));
});

operatorBtn.forEach(function(btn){
    btn.addEventListener('click', () => chooseOperator(btn.textContent))
});

function appendInput(num){
    if(screenText.textContent === "0" || resetNextInput){
        clearScreen();
    }
    screenText.textContent += num;
    if(screenText.textContent.length > 10){
        screenText.textContent = screenText.textContent.substring(0,12);
    }
}

function chooseOperator(op){
    if(currentOp !== null){
        doCalculation();
    }
    num1 = screenText.textContent;
    currentOp = op;
    resetNextInput = true;
}

function doCalculation(){
    if(currentOp === null || resetNextInput){
        return;
    }
    if(currentOp === "÷" && screenText.textContent === "0"){
        return;
    }
    num2 = screenText.textContent;
    screenText.textContent = round(operate(currentOp, num1, num2));
    currentOp = null;
}

function round(num){
    return Math.round(num * 10000) / 10000;
}

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(op, a, b){
    a = Number(a);
    b = Number(b);
    switch(op){
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case 'x':
            return multiply(a,b);
        case '÷':
            if(b===0){
                return null
                console.log("You can't divide by 0!")
            } else {
                return divide(a,b);
            }
        default:
            return null
    }
}

clearBtn.addEventListener('click', clearAll);
delBtn.addEventListener('click', deleteNum);
decimalBtn.addEventListener('click', addDecimal);
equalBtn.addEventListener('click', doCalculation);

function clearScreen(){
    screenText.textContent = "";
    resetNextInput = false;
}

function clearAll(){
    screenText.textContent = "0";
    num1 = "";
    num2 = "";
    currentOp = null;
}

function deleteNum(){
    //removes the last character from the string
    screenText.textContent = screenText.textContent.toString().slice(0,-1);
    if(screenText.textContent ===""){
        screenText.textContent = "0";
    }
}

function addDecimal(){
    if(resetNextInput) {
        clearScreen();
    }
    if(screenText.textContent === ""){
        screenText.textContent = "0";
    }
    if(screenText.textContent.includes(".")){
        return;
    }
    screenText.textContent += ".";
}

window.addEventListener('keydown', keyboardInput);

function keyboardInput(e){
    if (e.key >= 0 && e.key <= 9){
        appendInput(e.key);
    } 
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/'){
        chooseOperator(keyboardOp(e.key));
    }
    if (e.key === 'Escape'){
        clearAll(); 
    } 
    if (e.key === 'Backspace'){
        deleteNum();
    } 
    if (e.key === '.'){
        addDecimal();
    } 
    if (e.key === '=' || e.key === 'Enter'){
        doCalculation();
    } 
    
    
  
}

function keyboardOp(op){
    if(op === "+"){
        return "+";
    } else if(op === "-"){
        return "-";
    } else if(op === "*"){
        return "x";
    } else if(op === "/"){
        return "÷";
    }
}


