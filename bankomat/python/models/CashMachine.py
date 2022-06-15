from services.BankProvider import BankProvider

class CashMachine():
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
