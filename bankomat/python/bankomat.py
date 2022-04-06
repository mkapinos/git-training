from asyncio.windows_events import NULL
from curses.ascii import US
import json
import functools


def readData():
    with open('users.json') as file:
        clients = json.load(file)
    return clients


class UserData():
    def __init__(self, id, name, surname, email, gender, yearOfBorn, assignedCards, operations):
        self.id = id
        self.name = name
        self.surname = surname
        self.email = email
        self.gender = gender
        self.yearOfBorn = yearOfBorn
        self.assignedCards = assignedCards
        self.operations = operations

    def __str__(self):
        return self.id, self.name, self.surname, self.email, self.gender, self.yearOfBorn, self.assignedCards, self.operations


class AssignedCards():
    def __init__(self, data):
        self.number = data["id"]
        self.pin = data["pin"]


class OperationsData():
    def __init__(self, data):
        self.operationId = data["id"]
        self.operationDate = data["date"]
        self.moneyNum = data["amount"]

class Operation():
    def __init__(self, data):
        self.operationId = data["id"]
        self.operationDate = data["date"]
        self.moneyNum = data["amount"]

class UserAccount():

    def __init__(self, data):

        self.id = data["id"]
        self.name = data["first_name"]
        self.surname = data["last_name"]
        self.assignedCards = map(lambda item: AssignedCards(item), data["assignedCards"])
        self.operations = map(lambda item: Operation(item), data["operations"])

    def getBalance(self):
        return functools.reduce(lambda x, y: x+y, self.operations)



class Card():
    def __init__(self, number, cvs, name, surname, expiryDate):
        self.number = number
        self.cvs = cvs
        self.name = name
        self.surname = surname
        self.expiryDate = expiryDate


class BankProvider(object):
    def __init__(self):
        self.__data = readData()

    __instance = None

    def __new__(cls, val):
        if BankProvider.__instance is None:
            BankProvider.__instance = object.__new__(cls)
        BankProvider.__instance.val = val
        return BankProvider.__instance

    def __findAccount(self, number, pin):
        for item in self.__data:
            for card in item["assignedCards"]:
                if card["id"] == number and card["pin"] == pin:
                    return True
        return False

    def __findAccountData(self, id):
        if next(filter(lambda item: item["id"] == id, self.__data), False):
            return True
        else:
            return False

    def checkPin(self, number, pin):
        return self.__findAccount(number, pin)   

    def payOut(self, number, pin, money):
        account = self.__findAccount(number, pin)
        if account:
            if account.getBalance() >= money:
                operationData = 


class CashMashine():
    def __init__(self, moneyAmount):

        self.__moneyAmount = moneyAmount
        self.__bankProvider = BankProvider()
        self.__inputedCard = None
        self.__inputedPin = None
        self.__inputedAmount = None
        self.__isLogged = False

    def insertCard(self, card):

        if self.__inputedCard != None:
            return "Error"

        self.__inputedCard = card

    def insertPin(self, pin):
        self.__inputedPin = pin

    def __checkPinInBank(self):
        if self.__inputedCard["id"] and self.__inputedPin:
            return self.__bankProvider.checkPin(self.__inputedCard["id"], self.__inputedPin)
        else:
            print("you must first insert amout of money you want withdraw")


    def __payOutFromBank(self):
        if self.__inputedCard and self.__inputedCard.id and self.__inputedPin:
            return self.__bankProvider.checkPin(self.__inputedCard["id"], self.__inputedPin, self.__inputedAmount)

    def logIn(self):
        if self.__checkPinInBank():
            print("you are succesfully logged")
            self.isLogged = True

    def insertAmount(self, amount):
        if self.isLogged:
            if amount <= self.__moneyAmount:
                self.__inputedAmount = amount
                print(f"cash to withdraw: {amount}")
            else:
                print("sorry atm have not enought cash to withdraw")
        else:
            print("you aren't logged in")
               

    def payOut(self):
        if self.isLogged:
            if self.__inputedAmount and self.__payOutFromBank():
                self.__moneyAmount -= self.__inputedAmount
                print(f"you withdrew {self.__inputedAmount}")

        else:
            print("you aren't logged in")

    def checkBalance(self):
        if self.isLogged:
            if self.__inputedCard["id"] and self.__inputedPin:
                balance = self.__bankProvider.checkBalanceFromBank(self.__inputedCard["id"], self.__inputedPin) 
                if balance == NULL:
                    print("Unknown saldo in your bank account")
                else:
                    print(f"You have {balance} money in your bank account")
            else:
                print("firstly you must insert amount of money you want to withdraw")

    

# with open("people.json") as file:
#     clients = json.load(file)
#     for person in clients:
#         newbank = BankProvider()
#         newCard = Card(person["CardNumber"], "8/12", person["name"], person["surname"], "12.02.10")
#         break

# # newBankomat = CashMashine(10000000000000, newbank)
# # print(newBankomat.insertCard(newCard))

# # print(newBankomat.insertPin(1880))
# # print(newBankomat.insertAmount(739052356))

# # print(newBankomat.payOut())
# # print("Thank you")
