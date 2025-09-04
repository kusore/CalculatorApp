const addNum = (a, b) => {
    return a + b;
}

const subNum = (a, b) => {
    return a - b;
}

const mulNum = (a, b) => {
    return a * b;
}

const divNum = (a, b) => {
    return a / b;
}

const doCalculation = (operator, firstNum, secondNum) => {
    const validOps = ["+", "-", "x", "/"];
    if(validOps.includes(operator)){
        const index = validOps.indexOf(operator);
        console.log(index);
        switch (index) {
            case 0:
                return addNum(firstNum, secondNum);
            case 1:
                return subNum(firstNum, secondNum);
            case 2: 
                return mulNum(firstNum, secondNum);
            case 3: 
                return divNum(firstNum, secondNum);
        }
    }
    return "Invalid Input";
}
//html
const button = document.querySelectorAll(".calculations");
let displayNum = document.getElementById("display");
let calc;

//js calc
let currentNum = 0.0;
let previousNum = 0;
let storedNum = 0;
let decimal = false;
let unanswered = true;
let operator;

button.forEach((butt) => {
    butt.addEventListener("click", (event) => {
        calc = event.currentTarget.textContent.trim();
        if(calc >= '0' && calc <= '9') {
            if(unanswered){
                displayNum.value += calc;
                if(decimal){
                    currentNum += (calc - '0') / 10;
                } else if(currentNum === 0){
                    currentNum = calc - '0';
                } else{
                    currentNum *= 10;
                    currentNum += calc - '0';
                }      
            } else{
                displayNum.value = calc;
                unanswered = true;
                decimal = false;
                currentNum = calc - '0';
            }
        } else{
            switch (calc) {
                case "+":
                case "-":
                case "x":
                case "/":
                    if(currentNum !== 0){
                        if(previousNum !== 0){
                            break;
                        }
                        displayNum.value += " " + calc + " ";
                        previousNum = currentNum;
                        currentNum = 0;
                        decimal = false;
                        operator = calc;
                        break;
                    } 
                    break;
                case ".":
                    if(decimal || !unanswered){
                        break;
                    }
                    displayNum.value += ".";
                    decimal = true;
                    break;
                case "=":
                    if(currentNum !== 0){
                        let calculatedNum = doCalculation(operator, previousNum, currentNum);
                        displayNum.value = calculatedNum;
                        storedNum = calculatedNum;
                        currentNum = 0;
                        previousNum = 0;
                        unanswered = false;

                        break;
                    }

                case "AC":
                    displayNum.value = "";
                    currentNum = 0;
                    previousNum = 0;
                    storedNum = 0;
                    decimal = false;
                    unanswered = true;
                    break;
            }
        }
    })
})    

//something fucking wrong with my decimal shit