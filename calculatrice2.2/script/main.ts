let currentInput: string = "";
let scientificMode: boolean = false;

document.addEventListener("DOMContentLoaded", () => {
    initializeButtons();
    updateClock();
    setInterval(updateClock, 1000);
});

function initializeButtons(): void {
    const buttons = document.querySelectorAll(".buttons button");
    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const target = event.target as HTMLButtonElement;
            const value = target.dataset.value;

            if (value) {
                handleInput(value);
            }
        });
    });

    document.getElementById("scientific")?.addEventListener("click", toggleScientificMode);
    document.getElementById("normal")?.addEventListener("click", toggleScientificMode);
}

function handleInput(value: string): void {
    switch (value) {
        case "reset":
            reset();
            break;
        case "backspace":
            backspace();
            break;
        case "=":
            calculate();
            break;
        case "+":
        case "-":
        case "*":
        case "/":
        case "^":
        case "mod":
            addOperator(value);
            break;
        case "!":
            factorial();
            break;
        case "sqrt":
            sqrt();
            break;
        case "bin":
        case "hex":
        case "dec":
            convertToBase(value);
            break;
        case "exp":
            exponential();
            break;
        case "log":
            logarithm();
            break;
        case "cos":
            cosine();
            break;
        case "sin":
            sine();
            break;
        case "tan":
            tangent();
            break;
        default:
            addNumber(value);
            break;
    }
}

function addNumber(value: string): void {
    const display = document.getElementById("display") as HTMLInputElement;
    if (display.value === "0" || currentInput === "0") {
        display.value = "";
        currentInput = "";
    }
    display.value += value;
    currentInput += value;
}

function addOperator(operator: string): void {
    const display = document.getElementById("display") as HTMLInputElement;
    if (currentInput !== "" && !isLastCharacterOperator()) {
        display.value += ` ${operator} `;
        currentInput += operator;
    }
}

function isLastCharacterOperator(): boolean {
    const lastChar = currentInput.slice(-1);
    return ["+", "-", "*", "/", "^", "mod"].indexOf(lastChar) !== -1;
}

function calculate(): void {
    const display = document.getElementById("display") as HTMLInputElement;
    try {
        if (!isLastCharacterOperator() && currentInput !== "") {
            const sanitizedInput = currentInput.replace(/[^-()\d/*+.]/g, ''); // Sécurisation de l'entrée
            const result = Function(`'use strict'; return (${sanitizedInput})`)();
            display.value = result.toString();
            currentInput = result.toString();
        } else {
            display.value = "Erreur";
            currentInput = "";
        }
    } catch (error) {
        display.value = "Erreur";
        currentInput = "";
    }
}

function reset(): void {
    const display = document.getElementById("display") as HTMLInputElement;
    display.value = "";
    currentInput = "";
}

function backspace(): void {
    const display = document.getElementById("display") as HTMLInputElement;
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        display.value = formatDisplayValue(currentInput);
    }
}

function formatDisplayValue(input: string): string {
    return input.replace(/([\+\-\*\/\^])/g, ' $1 ');
}

function toggleScientificMode(): void {
    scientificMode = !scientificMode;
    const scientificButtons = document.getElementById("scientific-buttons");
    if (scientificButtons) {
        scientificButtons.classList.toggle("d-none", !scientificMode);
    }
}

function factorial(): void {
    const display = document.getElementById("display") as HTMLInputElement;
    const num = parseInt(currentInput);
    if (!isNaN(num)) {
        let result = 1;
        for (let i = 1; i <= num; i++) {
            result *= i;
        }
        display.value = result.toString();
        currentInput = result.toString();
    } else {
        display.value = "Erreur";
        currentInput = "";
    }
}

function sqrt(): void {
    const display = document.getElementById("display") as HTMLInputElement;
    const num = parseFloat(currentInput);
    if (!isNaN(num)) {
        const result = Math.sqrt(num);
        display.value = result.toString();
        currentInput = result.toString();
    } else {
        display.value = "Erreur";
        currentInput = "";
    }
}

function convertToBase(base: string): void {
    const display = document.getElementById("display") as HTMLInputElement;
    const num = parseInt(currentInput);
    if (!isNaN(num)) {
        let result: string;
        switch (base) {
            case "bin":
                result = num.toString(2);
                break;
            case "hex":
                result = num.toString(16);
                break;
            case "dec":
                result = num.toString(10);
                break;
            default:
                result = num.toString();
                break;
        }
        display.value = result;
        currentInput = result;
    } else {
        display.value = "Erreur";
        currentInput = "";
    }
}

function exponential(): void {
    const display = document.getElementById("display") as HTMLInputElement;
    const num = parseFloat(currentInput);
    if (!isNaN(num)) {
        const result = Math.exp(num);
        display.value = result.toString();
        currentInput = result.toString();
    } else {
        display.value = "Erreur";
        currentInput = "";
    }
}

function logarithm(): void {
    const display = document.getElementById("display") as HTMLInputElement;
    const num = parseFloat(currentInput);
    if (!isNaN(num)) {
        const result = Math.log(num);
        display.value = result.toString();
        currentInput = result.toString();
    } else {
        display.value = "Erreur";
        currentInput = "";
    }
}

function cosine(): void {
    const display = document.getElementById("display") as HTMLInputElement;
    const num = parseFloat(currentInput);
    if (!isNaN(num)) {
        const result = Math.cos(num);
        display.value = result.toString();
        currentInput = result.toString();
    } else {
        display.value = "Erreur";
        currentInput = "";
    }
}

function sine(): void {
    const display = document.getElementById("display") as HTMLInputElement;
    const num = parseFloat(currentInput);
    if (!isNaN(num)) {
        const result = Math.sin(num);
        display.value = result.toString();
        currentInput = result.toString();
    } else {
        display.value = "Erreur";
        currentInput = "";
    }
}

function tangent(): void {
    const display = document.getElementById("display") as HTMLInputElement;
    const num = parseFloat(currentInput);
    if (!isNaN(num)) {
        const result = Math.tan(num);
        display.value = result.toString();
        currentInput = result.toString();
    } else {
        display.value = "Erreur";
        currentInput = "";
    }
}

function updateClock(): void {
    const clock = document.getElementById("clock");
    if (clock) {
        const now = new Date();
        clock.textContent = now.toLocaleTimeString();
    }
}


var btn : any = document.getElementById("scientific");
var position : any = document.getElementById("section");

var afficher : any = false;

btn.addEventListener('click', function () {
    if (!afficher) {
        position.style.display='block';
        btn.innerHTML='Normal';
        afficher=true;
    } else {
        position.style.display='none';
        btn.innerHTML='Scientifique';
        afficher=false;
    }
})