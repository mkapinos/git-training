import json
import functools
import datetime

def readData():
    with open('accounts.json') as file:
        clients = json.load(file)
    return clients


def writeData(listObj):
    with open('accounts.json', 'w') as json_file:
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
        self.assignedCards = list(map(
            lambda item: AssignedCards(item), data["assignedCards"]))
        self.operations = list(map(lambda item: Operation(item), data["operations"]))

    def getBalance(self):
        return functools.reduce(lambda prev, curr: prev + curr.moneyNum, self.operations, 0)


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
        self.accounts = list(map(lambda item: UserAccount(item), self.__data))

    __instance__ = None

    def __new__(cls, *args, **kwargs):
        if BankProvider.__instance__ is None:
            BankProvider.__instance__ = dict.__new__(cls)
        return BankProvider.__instance__

    def __findAccount(self, number, pin):
        founded = None
        #print('start finding', len(self.accounts))
        for account in self.accounts:
            #print('Account: ', account.id)
            for card in account.assignedCards:
                #print(card.number, card.pin, 'vs', number, pin)
                if card.number == number and card.pin == pin:
                    founded = account
                    return account
        #print('not found')
        return founded

    def __findAccountData(self, id):
        founded = list(filter(lambda item: item["id"] == id, self.__data))
        if len(founded) > 0:
            return founded[0]
        else:
            return None

    def checkPin(self, number, pin):
        return self.__findAccount(number, pin) is not None

    def payOut(self, number, pin, money):
        account = self.__findAccount(number, pin)
        if account is not None:
            if account.getBalance() >= money:
                preparedMoney = account.getBalance()
                preparedId = len(account.operations) + 1
                preparedDate = datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
                preparedMoney = -money
                operationData = {"id": preparedId,
                                 "date": preparedDate, "amount": preparedMoney}
                account.operations.append(Operation(operationData))

                accountData = self.__findAccountData(account.id)
                #print('accountData', accountData)
                if accountData is not None:
                    accountData["operations"].append(operationData)
                    writeData(self.__data)
                    #print('writeData')
                    return True
            else:
                print("Error: not enough money")
        else:
            print("Error: invalid authorisation")
        return False

    def checkBalanceFromBank(self, number, pin):
        account = self.__findAccount(number, pin)
        if account is not None:
            return account.getBalance()
        else:
            print("Error: invalid authorisation")
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
        if self.__inputedCard != None:
            return "Error"

        self.__inputedCard = card

    def insertPin(self, pin):
        self.__inputedPin = pin

    def __checkPinInBank(self):
        if self.__inputedCard and self.__inputedCard.number and self.__inputedPin:
            return self.__bankProvider.checkPin(self.__inputedCard.number, self.__inputedPin)
        else:
            print("Error: you must first insert amout of money you want withdraw")

    def __payOutFromBank(self):
        if self.__inputedCard and self.__inputedCard.number and self.__inputedPin:
            return self.__bankProvider.payOut(self.__inputedCard.number, self.__inputedPin, self.__inputedAmount)

    def logIn(self):
        if self.__checkPinInBank():
            print("you are succesfully logged")
            self.isLogged = True
        else:
            print("Error: wrong pin or card number")
            self.isLogged = False

        return self.isLogged

    def insertAmount(self, amount):
        if self.isLogged:
            if amount <= self.__moneyAmount:
                self.__inputedAmount = amount
                print(f"cash to withdraw: {amount}")
            else:
                print("Error: sorry atm have not enought cash to withdraw")
        else:
            print("Error: you aren't logged in")

    def payOut(self):
        if self.isLogged:
            if self.__inputedAmount:
                if(self.__payOutFromBank()):
                    self.__moneyAmount -= self.__inputedAmount
                    print(f"you withdrew {self.__inputedAmount}")
                else:
                    print("Pay out from bank error")
            else:
                print("Please choose amount")

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
                print("Error: firstly you must insert amount of money you want to withdraw")

atm = CashMashine(10000000000000)
card1 = Card(1001, 12, "Jan", "Kowalski", datetime.datetime.now())
atm.insertCard(card1)
atm.insertPin(1234)
if atm.logIn():
    atm.checkBalance()
    atm.insertAmount(100)
    atm.payOut()
    print("Thank you")
