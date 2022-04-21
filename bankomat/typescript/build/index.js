"use strict";
var fs = require('fs');
var Mysql = require('sync-mysql');
var connection = new Mysql({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bankomat'
});
var result = connection.query('SELECT * FROM accounts');
console.log(result);
function readData() {
    var data = fs.readFileSync('../accounts.json', 'utf8');
    return JSON.parse(data);
}
function writeData(a) {
    fs.writeFile('../accounts.json', JSON.stringify(a), function (err) {
        if (err) {
            console.log(err);
        }
    });
}
// class user {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//     gender: string;
//     yearOfBorn: number;
//     constructor(data: userData) {
//       this.id = data.id;
//       this.firstName = data.first_name;
//       this.lastName = data.last_name;
//       this.email = data.email;
//       this.gender = data.gender;
//       this.yearOfBorn = data.yearOfBorn;
//     }
//   }
var UserAccount = /** @class */ (function () {
    function UserAccount(data) {
        this.userId = data.id;
        this.operations = data.operations.map(function (item) { return new Operation(item); });
        this.firstName = data.first_name;
        this.lastName = data.last_name;
        this.assignedCards = data.assignedCards.map(function (item) { return new AssignedCards(item); });
    }
    UserAccount.prototype.getBalance = function () {
        return this.operations.reduce(function (prev, curr) {
            prev += curr.amount;
            return prev;
        }, 0);
    };
    return UserAccount;
}());
var AssignedCards = /** @class */ (function () {
    function AssignedCards(data) {
        this.id = data.id;
        this.pin = data.pin;
    }
    return AssignedCards;
}());
var Operation = /** @class */ (function () {
    function Operation(data) {
        this.id = data.id;
        this.date = data.date;
        this.amount = data.amount;
    }
    return Operation;
}());
var Card = /** @class */ (function () {
    function Card(id, csv, name, surname, exp_date) {
        this.id = id;
        this.CSV_code = csv;
        this.firstName = name;
        this.lastName = surname;
        this.exp_date = exp_date;
    }
    return Card;
}());
var BankProvider = /** @class */ (function () {
    function BankProvider() {
        this.data = readData();
        this.refreshUsersAccounts();
    }
    BankProvider.getInstance = function () {
        if (!BankProvider.instance) {
            BankProvider.instance = new BankProvider();
        }
        return BankProvider.instance;
    };
    BankProvider.prototype.checkPin = function (cardNumber, pin) {
        return !!this.findAccount(cardNumber, pin);
    };
    BankProvider.prototype.findAccount = function (cardNumber, pin) {
        return this.accountsData.find(function (item) {
            return item.assignedCards.find(function (card) { return card.id === cardNumber && card.pin === pin; });
        });
    };
    BankProvider.prototype.findAccountData = function (id) {
        return this.data.find(function (item) { return item.id === id; });
    };
    BankProvider.prototype.payOut = function (cardNumber, pin, amount) {
        var account = this.findAccount(cardNumber, pin);
        if (account) {
            if (account.getBalance() >= amount) {
                var operationData = { id: account.operations.length + 1, date: new Date, amount: -amount };
                account.operations.push(new Operation(operationData));
                var accountData = this.findAccountData(account.userId);
                if (accountData) {
                    accountData.operations.push(operationData);
                    writeData(this.data);
                }
                return true;
            }
            else {
                console.log("niewystarczajace srodki \n na koncie: ".concat(account.getBalance(), " \n do wyplacenia: ").concat(amount));
            }
        }
        else {
            console.log("invalid authorisation");
        }
        return false;
    };
    BankProvider.prototype.checkeBalanceFromBank = function (cardNumber, pin) {
        var account = this.findAccount(cardNumber, pin);
        if (account) {
            return account.getBalance();
        }
        else {
            console.log("invalid authorisation");
        }
        return null;
    };
    BankProvider.prototype.refreshUsersAccounts = function () {
        this.accountsData = this.data.map(function (item) { return new UserAccount(item); });
    };
    return BankProvider;
}());
var CashMachine = /** @class */ (function () {
    function CashMachine(stateOfMoney, maintenanceCode) {
        this.isLogged = false;
        this.stateOfMoney = stateOfMoney;
        this.bankProvider = BankProvider.getInstance();
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
    CashMachine.prototype.insertAmount = function (amount) {
        if (this.isLogged) {
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
            if (this.imputedAmount && this.payOutFromBank()) {
                this.stateOfMoney -= this.imputedAmount;
                console.log("You wirdawed ".concat(this.imputedAmount));
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
                var saldo = this.bankProvider.checkeBalanceFromBank(this.inputedCard.id, this.inputedPin);
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
    return CashMachine;
}());
var atm = new CashMachine(10000, 12345);
var card1 = new Card(1001, 12, "Jan", "Kowalski", new Date());
atm.insertCard(card1);
atm.insertPin(1234);
atm.logIn();
atm.checkBalance();
atm.insertAmount(199);
atm.payOut();
//
// atm.checkBalance()
// atm.maintenance(12345, 1)
// atm.checkMoneyInATM()
// const userAccount1 = new userAccount(data[0]);
// console.log(userAccount1);
// const bankprovider1 = new BankProvider(data)
// if (bankprovider1.payOut(1001, 1234, 10) === true){
//  console.log("AAA")
// }
// console.log(bankprovider1)
// data.map((item:any) => item.assignedCards.forEach((el:assignedCards) =>
//         console.log(el.id) ))
// const a1 = new userAccount(data[0])
// console.log(a1)