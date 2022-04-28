"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankProvider = void 0;
var user_account_1 = require("../models/user-account");
var mysql = require('sync-mysql');
var BankProvider = /** @class */ (function () {
    function BankProvider() {
        this.connection = new mysql({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bankomat'
        });
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
        var query = 'SELECT * from cards WHERE cards.number = ? AND cards.pin = ?';
        var result = this.connection.query(query, [cardNumber, pin]);
        if (result && result[0]) {
            var accountId = result[0].account_id;
            var accResult = this.connection.query('SELECT * from accounts WHERE accounts.id = ?', [accountId]);
            var account = accResult[0];
            if (account) {
                var accountData = {
                    id: account.id,
                    first_name: account.first_name,
                    last_name: account.last_name,
                    email: account.last_name,
                    gender: account.gender,
                    yearOfBorn: account.year_of_born,
                    operations: [],
                    assignedCards: [],
                };
                return new user_account_1.UserAccount(accountData);
            }
        }
        return;
    };
    BankProvider.prototype.payOut = function (cardNumber, pin, amount) {
        var account = this.findAccount(cardNumber, pin);
        if (account) {
            var balance = this.getAccountBalance(account);
            if (balance >= amount) {
                this.addOperation(account, -amount);
                return true;
            }
            else {
                console.log("niewystarczajace srodki \n na koncie: ".concat(balance, " \n do wyplacenia: ").concat(amount));
            }
        }
        else {
            console.log("invalid authorisation");
        }
        return false;
    };
    BankProvider.prototype.payIn = function (cardNumber, pin, amount) {
        var account = this.findAccount(cardNumber, pin);
        if (account) {
            this.addOperation(account, amount);
            return true;
        }
        else {
            console.log("invalid authorisation");
        }
        return false;
    };
    BankProvider.prototype.checkBalanceFromBank = function (cardNumber, pin) {
        var account = this.findAccount(cardNumber, pin);
        if (account) {
            return this.getAccountBalance(account);
        }
        else {
            console.log("invalid authorisation");
        }
        return null;
    };
    BankProvider.prototype.getAccountBalance = function (userAccount) {
        var query = 'SELECT COALESCE(sum(amount), 0) AS sum FROM operations WHERE account_id = ?';
        var result = this.connection.query(query, [userAccount.userId]);
        return result[0].sum;
    };
    BankProvider.prototype.addOperation = function (userAccount, amount) {
        var query = "INSERT INTO operations (date, amount, account_id) VALUES (CURRENT_TIMESTAMP(), ?, ?)";
        var result = this.connection.query(query, [amount, userAccount.userId]);
        return result.insertId;
    };
    return BankProvider;
}());
exports.BankProvider = BankProvider;
