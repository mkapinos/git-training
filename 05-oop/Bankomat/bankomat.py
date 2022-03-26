import json

class Card():
    def __init__(self, number, cvs, name, surname, expiryDate):
        self.number = number
        self.cvs = cvs
        self.name = name
        self.surname = surname
        self.expiryDate = expiryDate

class BankProvider():

    def checkPin(self, number, pin):
        with open("people.json") as file:
            clients = json.load(file)
            for person in clients:
                if person["PIN"] == self.__pin:
                    return True
            return False
    
    def payOut(self, number, pin, amount):
        return True



class CashMashine():
    def __init__(self, moneyAmount, bankProvider):

        self.__moneyAmount = moneyAmount
        self.__bankProvider = bankProvider
        self.__inputedCard = None 
        self.__inputedPin = None
        self.__inputedAmount = None

    def insertCard(self, card):

        if self.__inputedCard != None:
            return "there is already one card"

        self.__inputedCard = card

        return "insert PIN"


    def insertPin(self, pin):
        self.__pin = pin
        return "insert amount"

    def insertAmount(self, amount):
        if amount > self.__moneyAmount:
            return "Error"
        else:
            self.__inputedAmount = amount
            return "wait for your money"
    
    def payOut(self):
        self.__bankProvider.payOut(self.__inputedCard, self.__inputedPin, self.__inputedAmount)
        return self.__inputedAmount
    
with open("people.json") as file:
    clients = json.load(file)
    for person in clients:  
        newbank = BankProvider()
        newCard = Card(person["CardNumber"], "8/12", person["name"], person["surname"], "12.02.10")
        break

newBankomat = CashMashine(10000000000000, newbank)
print(newBankomat.insertCard(newCard))

print(newBankomat.insertPin(1880))
print(newBankomat.insertAmount(739052356))

print(newBankomat.payOut())
print("Thank you")



        

  
