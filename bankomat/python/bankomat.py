import datetime 

from Card import Card
from CashMachine import CashMashine

atm = CashMashine(10000000000000)
card1 = Card(123123123123, 12, "Jan", "Kowalski", datetime.datetime.now())
atm.insertCard(card1)
atm.insertPin(122)
if atm.logIn():
    atm.checkBalance()
    atm.insertAmount(100)
    atm.payOut()
    print("Thank you")
