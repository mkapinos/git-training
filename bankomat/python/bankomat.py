import datetime 

from Card import Card
from CashMachine import CashMashine

atm = CashMashine(10000000000000)
card1 = Card(1234567890123456, 1234, "Kamila", "Kabanos", datetime.datetime.now())
atm.insertCard(card1)
atm.insertPin(5632)
if atm.logIn():
    atm.checkBalance()
    atm.insertAmount(300)
    atm.payOut()
    print("Thank you")
