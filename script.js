let x = '';
let y = '';
let currentOperation = null;
let shouldReset = false;

const currentOperationText = document.querySelector('#currentOperation');
const lastOperationText = document.querySelector('#lastOperation');
const buttons = document.querySelectorAll('button');

function buttonsEnable() {
  buttons.forEach((button) => {
    if (button.classList.contains('number')) {
      button.addEventListener('click', () => {
        addNumber(button.textContent);
      });
    }
    if (button.classList.contains('clear')) {
      button.addEventListener('click', clear);
    }
    if (button.classList.contains('delete')) {
      button.addEventListener('click', deleteText);
    }
    if (button.classList.contains('operator')) {
      button.addEventListener('click', () => {
        addOperator(button.textContent);
      });
    }
    if (button.classList.contains('coma')) {
      button.addEventListener('click', addComa);
    }
    if (button.classList.contains('equals')) {
      button.addEventListener('click', evaluate);
    }
  });
}

function addNumber(num) {
  if (currentOperationText.textContent === '0' || shouldReset) resetScreen();
  currentOperationText.textContent += num;
}

function resetScreen() {
  currentOperationText.textContent = '';
  shouldReset = false;
}

function clear() {
  currentOperationText.textContent = '0';
  lastOperationText.textContent = '';
  x = '';
  y = '';
  currentOperation = null;
}

function addComa() {
  if (shouldReset) resetScreen();
  if (currentOperationText.textContent === '')
    currentOperationText.textContent = '0';
  if (currentOperationText.textContent.includes('.')) return;
  currentOperationText.textContent += '.';
}

function deleteText() {
  currentOperationText.textContent = currentOperationText.textContent
    .toString()
    .slice(0, -1);
}

function roundResult(num) {
  return Math.round(num * 1000) / 1000;
}

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, x, y) {
  a = Number(x);
  b = Number(y);
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return substract(a, b);
    case '*':
      return multiply(a, b);
    case '÷':
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}

function evaluate() {
  if (currentOperation === null || shouldReset) return;
  if (currentOperation === '÷' && currentOperationText.textContent === '0') {
    alert("Can't divide by 0");
    return;
  }
  y = currentOperationText.textContent;
  currentOperationText.textContent = roundResult(
    operate(currentOperation, x, y)
  );
  lastOperationText.textContent = `${x} ${currentOperation} ${y} =`;
  currentOperation = null;
}

function addOperator(operator) {
  if (currentOperation !== null) evaluate();
  x = currentOperationText.textContent;
  currentOperation = operator;
  lastOperationText.textContent = `${x} ${currentOperation}`;
  shouldReset = true;
}

buttonsEnable();
