import datetime

from models.Card import Card
from models.CashMachine import CashMachine

# Example of usage
atm = CashMachine(10000000000000)
card1 = Card(1234567890123456, 1234, "Kamila", "Kap", datetime.datetime.now())
atm.insertCard(card1)
atm.insertPin(5632)
if atm.logIn():
    atm.checkBalance()
    atm.insertAmount(300)
    atm.payOut()
    print("Thank you")
