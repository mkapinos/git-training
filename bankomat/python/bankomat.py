from curses.ascii import US
import json
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
    def __init__(self, number, pin):
        self.number = number
        self.pin = pin

class OperationsData():
    def __init__(self, operationId, operationDate, moneyNum):
        self.operationId = operationId
        self.operationDate = operationDate
        self.moneyNum = moneyNum

class UserAccount():
    def __init__(self, id, name, surname, assignedCards, operations):
        self.id = id
        self.name = name
        self.surname = surname
        self.assignedCards = assignedCards
        self.operations = operations

class Operation(OperationsData):
    def __init__(self, operationId, operationDate, moneyNum):
        super.__init__(operationId, operationDate, moneyNum)
        
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

    def checkPin(self, number, pin):
        return self.__findAccount(number, pin)

    def __findAccount(self, number, pin):
        for item in self.data:
            if item.assignedCards: 
                account = lambda card: card.id == number and card.pin == pin
                yyy = next(filter(account, self.__data), None)
        
        return yyy

    def __findAccountsData(self, id):
        data = lambda item: item.id == id
        yyy = next(filter(data, self.__data), None)


    def payOut(self, number, pin, money):
        account = self.__findAccount(number, pin):
        if account:
            if account.getBalance() >= money:
                operationData = OperationsData()



# class CashMashine():
#     def __init__(self, moneyAmount, bankProvider):

#         self.__moneyAmount = moneyAmount
#         self.__bankProvider = bankProvider
#         self.__inputedCard = None 
#         self.__inputedPin = None
#         self.__inputedAmount = None

#     def insertCard(self, card):

#         if self.__inputedCard != None:
#             return "there is already one card"

#         self.__inputedCard = card

#         return "insert PIN"


#     def insertPin(self, pin):
#         self.__pin = pin
#         return "insert amount"

#     def insertAmount(self, amount):
#         if amount > self.__moneyAmount:
#             return "Error"
#         else:
#             self.__inputedAmount = amount
#             return "wait for your money"
    
#     def payOut(self):
#         self.__bankProvider.payOut(self.__inputedCard, self.__inputedPin, self.__inputedAmount)

#         return self.__inputedAmount
    
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