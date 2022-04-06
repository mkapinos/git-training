import json
import functools
import datetime


def readData():
    with open('users.json') as file:
        clients = json.load(file)
    return clients


def writeData(listObj):
    with open('users.json', 'w') as json_file:
        json.dump(listObj, json_file,
                  indent=4,
                  separators=(',', ': '))


class AssignedCards():
    def __init__(self, data):
        self.number = data["id"]
        self.pin = data["pin"]


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
        self.assignedCards = map(
            lambda item: AssignedCards(item), data["assignedCards"])
        self.operations = map(lambda item: Operation(item), data["operations"])

    def getBalance(self):
        return functools.reduce(lambda prev, curr: prev + curr.amount, self.operations, 0)


class Card():
    def __init__(self, number, cvs, name, surname, expiryDate):
        self.number = number
        self.cvs = cvs
        self.name = name
        self.surname = surname
        self.expiryDate = expiryDate


class BankProvider(dict):
    def __init__(self):
        self.__data = readData()
        self.accounts = map(lambda item: UserAccount(item), self.__data)
        print(len(self.__data))

    # __instance = None

    # def __new__(cls, val):
    #     if BankProvider.__instance is None:
    #         BankProvider.__instance = object.__new__(cls)
    #     BankProvider.__instance[val] = val
    #     return BankProvider.__instance

    __instance__ = None

    def __new__(cls, *args, **kwargs):
        if BankProvider.__instance__ is None:
            BankProvider.__instance__ = dict.__new__(cls)
        return BankProvider.__instance__

    def __findAccount(self, number, pin):
        for account in self.accounts:
            for card in account.assignedCards:
                if card.number == number and card.pin == pin:
                    return account
        return None

    def __findAccountData(self, id):
        founded = filter(lambda item: item["id"] == id, self.__data)
        if len(founded) > 0:
            return next(founded)
        else:
            return None

    def checkPin(self, number, pin):
        return self.__findAccount(number, pin) is not None

    def payOut(self, number, pin, money):
        account = self.__findAccount(number, pin)
        if account is not None:
            if account.getBalance() >= money:
                preparedMoney = account.getBalance()
                preparedId = len(account["operations"] + 1)
                preparedDate = datetime.datetime.now()
                preparedMoney -= money
                operationData = {"id": preparedId,
                                 "date": preparedDate, "amount": preparedMoney}
                account["operations"].append(Operation(operationData))

            accountData = self.__findAccountData(account["userId"])
            if accountData is not None:
                accountData["operations"].append(operationData)
                writeData(self.__data)
                return True
            else:
                print("not enough money")
        else:
            print("invalid authorisation")
        return False

    def checkBalanceFromBank(self, number, pin):
        print(number, pin)
        account = self.__findAccount(number, pin)
        if account is not None:
            return account.getBalance()
        else:
            print("invalid authorisation")
        return None


class CashMashine():
    def __init__(self, moneyAmount):

        self.__moneyAmount = moneyAmount
        self.__bankProvider = BankProvider()
        self.__inputedCard = None
        self.__inputedPin = None
        self.__inputedAmount = None
        self.__isLogged = False

    def insertCard(self, card):
        print(card)
        if self.__inputedCard != None:
            return "Error"

        self.__inputedCard = card

    def insertPin(self, pin):
        self.__inputedPin = pin

    def __checkPinInBank(self):
        print("sss", self.__inputedCard)
        if self.__inputedCard.number and self.__inputedPin:
            return self.__bankProvider.checkPin(self.__inputedCard.number, self.__inputedPin)
        else:
            print("you must first insert amout of money you want withdraw")

    def __payOutFromBank(self):
        if self.__inputedCard and self.__inputedCard.id and self.__inputedPin:
            return self.__bankProvider.checkPin(self.__inputedCard.number, self.__inputedPin, self.__inputedAmount)

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
            if self.__inputedCard.number and self.__inputedPin:
                balance = self.__bankProvider.checkBalanceFromBank(
                    self.__inputedCard.number, self.__inputedPin)
                if balance == None:
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
atm = CashMashine(10000000000000)
card1 = Card(1001, 12, "Jan", "Kowalski", datetime.datetime.now())
atm.insertCard(card1)
atm.insertPin(1234)
atm.logIn()
atm.checkBalance()
