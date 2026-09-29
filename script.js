const digitsDiv = document.getElementById("digits");
const display = document.getElementById("display");
const operators = document.querySelectorAll("#operators button");
const operateBtn = document.getElementById("calculate");
const clearBtn = document.getElementById("clear");


let resetDisplay = false;
let decimalPressed = false;
let num1 = undefined;
let num2 = undefined;
let operator = '';
let numberStr = '';



function createDigits() {
   for(let i = 0; i <= 9; i++) {
      const newBtn = document.createElement("button");
      newBtn.innerText = `${i}`;
      newBtn.addEventListener("click", (event) => {
         if(resetDisplay) {
            display.value = '';
            resetDisplay = false;
         }
         display.value += event.target.innerText;
         numberStr += event.target.innerText;
      })
      digitsDiv.appendChild(newBtn);
   }

   // For decimal
   const decimalBtn = document.createElement("button");
   decimalBtn.innerText = ".";
   decimalBtn.addEventListener("click", (event) => {
      if(!decimalPressed) {
         display.value += event.target.innerText;
         numberStr += event.target.innerText;
         decimalPressed = true;
      }
   });
   digitsDiv.appendChild(decimalBtn);
}

operators.forEach((item) => {
   item.addEventListener("click", (event) => {
      // display.value = '';
      resetDisplay = true;
      decimalPressed = false;
      operator = event.target.innerText;
      if(num1 == null) {
         num1 = Number(numberStr.trim());
         numberStr = '';
      }
      if(num1 != null && numberStr !== '') {
         operate();
         return;
      }
   })
})

function add(x, y) {
   return x + y;
}

function subtract(x, y) {
   return x - y;
}

function multiply(x, y) {
   return x * y;
}

function divide(x, y) {
   if(y == 0) return 'NaN';
   return x / y;
}

function operate() {
   // loadNumbers();
   num2 = Number(numberStr.trim());
   numberStr = '';
   switch(operator) {
      case '+':
         num1 = add(num1, num2);
         break;
      case '-':
         num1 = subtract(num1, num2);
         break;
      case '÷':
         num1 = divide(num1, num2);
         break;
      case 'x':
         num1 = multiply(num1, num2);
         break;
   }
   operator = '';
   display.value = num1;
   resetDisplay = true;
   decimalPressed = false;
}

createDigits();
operateBtn.addEventListener("click", operate);
clearBtn.addEventListener("click", () => {
   num1 = undefined;
   num2 = undefined;
   operator = '';
   numberStr = '';
   display.value = '';
})