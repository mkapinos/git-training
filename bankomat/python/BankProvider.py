import datetime
import mysql.connector

from Operation import Operation
from UserAccount import UserAccount

class BankProvider(dict):

    __instance__ = None

    _db = None

    def __new__(cls, *args, **kwargs):
        if BankProvider.__instance__ is None:
            BankProvider.__instance__ = dict.__new__(cls)
            mydb = mysql.connector.connect(
                host="127.0.0.1",
                user="root",
                password="root",
                database="bankomat"
            )
            BankProvider.__instance__._db = mydb

        return BankProvider.__instance__

    def __findAccount(self, number, pin):
        founded = None
        mycursor = self._db.cursor(dictionary=True)
        mycursor.execute('SELECT * FROM cards WHERE cards.number = "' + str(number) + '" AND cards.pin='+ str(pin))
        myresult = mycursor.fetchall()
        print(myresult)

        if myresult and myresult[0]:
            print(myresult[0])
            accountId = myresult[0]["account_id"]
            accCursor = self._db.cursor(dictionary=True)
            accCursor.execute('SELECT * FROM accounts WHERE id =' + str(accountId))
            accResult = accCursor.fetchall()
            print(accResult)
        
            account = accResult[0]

            if account:
                return UserAccount({
                    "id": account['id'],
                    "first_name": account['first_name'],
                    "last_name": account['last_name'],
                    "assignedCards": [],
                    "operations": []
                })
            
        #print('start finding', len(self.accounts))
        # for account in self.accounts:
        #     #print('Account: ', account.id)
        #     for card in account.assignedCards:
        #         #print(card.number, card.pin, 'vs', number, pin)
        #         if card.number == number and card.pin == pin:
        #             founded = account
        #             return account
        # #print('not found')
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

                # accountData = self.__findAccountData(account.id)
                # #print('accountData', accountData)
                # if accountData is not None:
                #     accountData["operations"].append(operationData)
                #     writeData(self.__data)
                #     #print('writeData')
                #     return True
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
