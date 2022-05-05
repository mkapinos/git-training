"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashMachine = void 0;
var bank_provider_service_1 = require("../services/bank-provider.service");
var CashMachine = /** @class */ (function () {
    function CashMachine(stateOfMoney, maintenanceCode) {
        this.isLogged = false;
        this.stateOfMoney = stateOfMoney;
        this.bankProvider = bank_provider_service_1.BankProvider.getInstance();
        this.maintenanceLogingCode = maintenanceCode;
    }
    CashMachine.prototype.insertCard = function (card) {
        if (this.inputedCard) {
            return console.log("Error");
        }
        else {
            this.inputedCard = card;
        }
    };
    CashMachine.prototype.insertPin = function (pin) {
        this.inputedPin = pin;
    };
    CashMachine.prototype.logIn = function () {
        if (this.checkPinInBank()) {
            console.log("you are succesfully logged");
            this.isLogged = true;
        }
    };
    CashMachine.prototype.logOut = function () {
        this.isLogged = false;
        this.inputedCard = undefined;
        this.inputedPin = undefined;
        console.log("you are succesfully logout");
    };
    CashMachine.prototype.insertAmount = function (amount) {
        if (this.isLogged && amount > 0) {
            if (this.stateOfMoney >= amount) {
                this.imputedAmount = amount;
                console.log("cash to withrdaw: ".concat(amount));
            }
            else
                console.log("sorry atm have not enought cash to withdraw");
        }
        else
            console.log("you must first log in");
    };
    CashMachine.prototype.payOut = function () {
        if (this.isLogged) {
            if (this.imputedAmount) {
                if (this.payOutFromBank()) {
                    this.stateOfMoney -= this.imputedAmount;
                    console.log("You withdrew ".concat(this.imputedAmount));
                    this.imputedAmount = undefined;
                }
                else {
                    console.log('DB ERROR');
                }
            }
            else {
                console.log("Please input amount");
            }
        }
        else
            console.log("you must first log in");
    };
    CashMachine.prototype.payIn = function () {
        if (this.isLogged) {
            if (this.imputedAmount) {
                if (this.payInFromBank()) {
                    this.stateOfMoney += this.imputedAmount;
                    console.log("You deposit ".concat(this.imputedAmount));
                    this.imputedAmount = undefined;
                }
                else {
                    console.log('DB ERROR');
                }
            }
            else {
                console.log("Please input amount");
            }
        }
        else
            console.log("you must first log in");
    };
    CashMachine.prototype.maintenance = function (code, maintenance) {
        if (this.maintenanceLogingCode === code) {
            if (maintenance === 1) {
                this.checkAtmStatus();
            }
            else if (maintenance === 2) {
                console.log("opening cashbox");
            }
            else if (maintenance === 3) {
                console.log("restaring...");
            }
            else
                console.log("comend unrecognized");
        }
        else
            console.log("wrong maintenence code");
    };
    CashMachine.prototype.checkBalance = function () {
        var _a;
        if (this.isLogged) {
            if (((_a = this.inputedCard) === null || _a === void 0 ? void 0 : _a.id) && this.inputedPin) {
                var saldo = this.bankProvider.checkBalanceFromBank(this.inputedCard.id, this.inputedPin);
                if (saldo === null) {
                    console.log("Unknown saldo in your bank account");
                }
                else {
                    console.log("You have ".concat(saldo, " money in your bank account"));
                }
            }
        }
        else {
            console.log("you must first insert amout of money you want withdraw");
        }
    };
    CashMachine.prototype.checkAtmStatus = function () {
        return console.log("money left in casbox ".concat(this.stateOfMoney));
    };
    CashMachine.prototype.checkPinInBank = function () {
        var _a;
        if (((_a = this.inputedCard) === null || _a === void 0 ? void 0 : _a.id) && this.inputedPin) {
            return this.bankProvider.checkPin(this.inputedCard.id, this.inputedPin);
        }
        else {
            console.log("you must first insert amout of money you want withdraw");
        }
    };
    CashMachine.prototype.payOutFromBank = function () {
        var _a;
        if (((_a = this.inputedCard) === null || _a === void 0 ? void 0 : _a.id) && this.inputedPin && this.imputedAmount) {
            return this.bankProvider.payOut(this.inputedCard.id, this.inputedPin, this.imputedAmount);
        }
    };
    CashMachine.prototype.payInFromBank = function () {
        var _a;
        if (((_a = this.inputedCard) === null || _a === void 0 ? void 0 : _a.id) && this.inputedPin && this.imputedAmount) {
            return this.bankProvider.payIn(this.inputedCard.id, this.inputedPin, this.imputedAmount);
        }
    };
    return CashMachine;
}());
exports.CashMachine = CashMachine;
