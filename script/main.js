function affiche() {
    var texte = document.getElementById("test");
    if (texte) {
        texte.innerHTML = "EYENGA";
    }
}
var Calculator = /** @class */ (function () {
    function Calculator() {
        this.display = document.getElementById("display");
        this.currentInput = "";
        this.initializeButtons();
    }
    // Initialisation des événements des boutons
    Calculator.prototype.initializeButtons = function () {
        var _this = this;
        var buttons = document.querySelectorAll(".buttons button");
        buttons.forEach(function (button) {
            button.addEventListener("click", function (event) {
                var target = event.target;
                var value = target.dataset.value;
                console.log("Button clicked: ".concat(value)); // Log pour le débogage
                if (value) {
                    _this.handleInput(value);
                }
            });
        });
    };
    // Gestion des clics sur les boutons
    Calculator.prototype.handleInput = function (value) {
        console.log("Handling input: ".concat(value)); // Log pour le débogage
        switch (value) {
            case "reset":
                this.reset();
                break;
            case "backspace":
                this.backspace();
                break;
            case "=":
                this.calculate();
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                this.addOperator(value);
                break;
            default:
                this.addNumber(value);
                break;
        }
    };
    // Ajout d'un nombre ou d'un point
    Calculator.prototype.addNumber = function (value) {
        console.log("Adding number: ".concat(value)); // Log pour le débogage
        if (this.display.value === "0" || this.currentInput === "0") {
            this.display.value = "";
            this.currentInput = "";
        }
        this.display.value += value;
        this.currentInput += value;
    };
    // Ajout d'un opérateur
    Calculator.prototype.addOperator = function (operator) {
        console.log("Adding operator: ".concat(operator)); // Log pour le débogage
        if (this.currentInput !== "" && !this.isLastCharacterOperator()) {
            this.display.value += " ".concat(operator, " ");
            this.currentInput += operator;
        }
    };
    // Vérifie si le dernier caractère est un opérateur
    Calculator.prototype.isLastCharacterOperator = function () {
        var lastChar = this.currentInput.slice(-1);
        return ["+", "-", "*", "/"].indexOf(lastChar) !== -1;
    };
    // Calcul du résultat
    Calculator.prototype.calculate = function () {
        console.log("Calculating result for: ".concat(this.currentInput)); // Log pour le débogage
        try {
            if (!this.isLastCharacterOperator() && this.currentInput !== "") {
                var sanitizedInput = this.currentInput.replace(/[^-()\d/*+.]/g, ''); // Sécurisation de l'entrée
                var result = Function("'use strict'; return (".concat(sanitizedInput, ")"))();
                this.display.value = result.toString();
                this.currentInput = result.toString();
            }
            else {
                this.display.value = "Erreur";
                this.currentInput = "";
            }
        }
        catch (error) {
            this.display.value = "Erreur";
            this.currentInput = "";
        }
    };
    // Réinitialise la calculatrice
    Calculator.prototype.reset = function () {
        console.log("Resetting calculator"); // Log pour le débogage
        this.display.value = "";
        this.currentInput = "";
    };
    // Efface le dernier caractère ou chiffre
    Calculator.prototype.backspace = function () {
        console.log("Backspacing"); // Log pour le débogage
        if (this.currentInput.length > 0) {
            // Supprime le dernier caractère de l'entrée actuelle
            this.currentInput = this.currentInput.slice(0, -1);
            // Met à jour l'affichage
            this.display.value = this.formatDisplayValue(this.currentInput);
        }
    };
    // Formate la valeur pour l'affichage (avec espaces autour des opérateurs)
    Calculator.prototype.formatDisplayValue = function (input) {
        return input.replace(/([\+\-\*\/])/g, ' $1 ');
    };
    return Calculator;
}());
// Initialisation de la calculatrice une fois la page chargée
document.addEventListener("DOMContentLoaded", function () {
    new Calculator();
});
