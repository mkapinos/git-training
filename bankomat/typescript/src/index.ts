import { Card } from "./models/card";
import { CashMachine } from "./models/cash-machine";

const atm = new CashMachine(10000, 12345)

const card1 = new Card(123123123123, 234, "Jan", "Kowalski", new Date ())

atm.insertCard(card1)
atm.insertPin(122)

atm.logIn()

atm.checkBalance()

atm.insertAmount(199)
atm.payOut()

atm.insertAmount(49)
atm.payIn()

atm.logOut()

// atm.insertCard(card1)
// atm.insertPin(122)
// atm.logIn()
// atm.checkBalance()
// atm.insertAmount(1000)
// atm.payIn()
// atm.logOut()


