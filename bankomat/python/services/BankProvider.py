import mysql.connector

from models.UserAccount import UserAccount
from config.Config import Config

class BankProvider(dict):

    __instance__ = None

    __db = None

    def __new__(cls, *args, **kwargs):
        if BankProvider.__instance__ is None:
            BankProvider.__instance__ = dict.__new__(cls)
            mydb = mysql.connector.connect(
                host=Config['db']['host'],
                user=Config['db']['user'],
                password=Config['db']['password'],
                database=Config['db']['database']
            )
            BankProvider.__instance__.__db = mydb

        return BankProvider.__instance__

    def __findAccount(self, number, pin):
        mycursor = self.__db.cursor(dictionary=True)
        mycursor.execute('SELECT * FROM cards WHERE cards.number = %s AND cards.pin= %s', (str(number),str(pin)))
        myresult = mycursor.fetchall()

        if myresult and myresult[0]:
            accountId = myresult[0]["account_id"]
            accCursor = self.__db.cursor(dictionary=True)
            accCursor.execute('SELECT * FROM accounts WHERE id = %s;', (str(accountId), ))
            accResult = accCursor.fetchall()
        
            account = accResult[0]

            if account:
                return UserAccount({
                    "id": account['id'],
                    "first_name": account['first_name'],
                    "last_name": account['last_name'],
                    "assignedCards": [],
                    "operations": []
                })
        return None

    def __getAccountBalance(self, userAccount):
        
        mycursor = self.__db.cursor(dictionary=True)
        
        mycursor.execute(
            'SELECT COALESCE(sum(amount), 0) AS sum FROM operations WHERE account_id = %s',
            (userAccount.id, )
        )

        myresult = mycursor.fetchone()
        return myresult['sum']

    def __addOperation(self, userAccount, amount):
        mycursor = self.__db.cursor(dictionary=True)
        sql = "INSERT INTO operations (date, amount, account_id) VALUES (CURRENT_TIMESTAMP(), %s, %s)"
        val = (amount, userAccount.id)
        mycursor.execute(sql, val)
        self.__db.commit()
        return mycursor.lastrowid

    def checkPin(self, number, pin):
        return self.__findAccount(number, pin) is not None

    def payOut(self, number, pin, money):
        account = self.__findAccount(number, pin)
        if account is not None:
            balance = self.__getAccountBalance(account)
            if balance >= money:
                self.__addOperation(account, -money)
                return True
            else:
                print("Error: not enough money")
        else:
            print("Error: invalid authorisation")
        return False

    def checkBalanceFromBank(self, number, pin):
        account = self.__findAccount(number, pin)
        return self.__getAccountBalance(account)
