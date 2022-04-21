class Card():
    def __init__(self, number, cvs, name, surname, expiryDate):
        self.number = number
        self.cvs = cvs
        self.name = name
        self.surname = surname
        self.expiryDate = expiryDate

x = Card(1, 2, "asd", "test", 123)
print(x.name)


class BankProvider(dict):
    def __init__(self):
        self.__data = readData()
        print(len(self.__data))

    # __instance = None

    # def __new__(cls, val):
    #     if BankProvider.__instance is None:
    #         BankProvider.__instance = object.__new__(cls)
    #     BankProvider.__instance[val] = val
    #     return BankProvider.__instance

    __instance__ = None
    def __new__(cls, *args,**kwargs):
        if BankProvider.__instance__ is None:
            BankProvider.__instance__ = dict.__new__(cls)
        return BankProvider.__instance__

    def __init__(self):
        self.x = 1

s1 = BankProvider()
s2 = BankProvider()
s1.x = 123

print('s1:', s1.x)
print('s2:', s2.x)
