"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var card_1 = require("./models/card");
var cash_machine_1 = require("./models/cash-machine");
var atm = new cash_machine_1.CashMachine(10000, 12345);
var card1 = new card_1.Card(123123123123, 234, "Jan", "Kowalski", new Date());
atm.insertCard(card1);
atm.insertPin(122);
atm.logIn();
atm.checkBalance();
atm.insertAmount(199);
atm.payOut();
for (var i = 1; i < 1000; i++) {
    atm.insertAmount(49);
    atm.payIn();
}
atm.logOut();
// atm.insertCard(card1)
// atm.insertPin(122)
// atm.logIn()
// atm.checkBalance()
// atm.insertAmount(1000)
// atm.payIn()
// atm.logOut()
