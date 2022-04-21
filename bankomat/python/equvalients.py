from xmlrpc.client import boolean


user = [{
    "id": 4,
    "first_name": "Ottilie",
    "last_name": "Northern",
    "email": "onorthern3@mediafire.com",
    "gender": "Female",
    "yearOfBorn": 1992,
    "assignedCards": [
        {
            "id": 1004,
            "pin": 1234
        }
    ],
    "operations": [
        {
            "id": 1,
            "date": "3/19/2021",
            "amount": -573.02
        },
        {
            "id": 2,
            "date": "8/13/2021",
            "amount": 168.52
        },
        {
            "id": 3,
            "date": "10/18/2021",
            "amount": -416.01
        },
        {
            "id": 4,
            "date": "10/7/2021",
            "amount": 486.74
        },
        {
            "id": 5,
            "date": "4/14/2021",
            "amount": -237.87
        }
    ]
}]

def checkPin(number, pin):
     return findAccount(number, pin)

def findAccount(number, pin):
    for item in user:
        for card in item["assignedCards"]:
            if card["id"] == number and card["pin"] == pin:
                return True
    return False

def findAccountData(id):
    if next(filter(lambda item: item["id"]==id, user), False):
        return True
    else:
        return False 

def payOut(number, pin, moneyNum):
    account = findAccount(number, pin)

            





print(findAccount(1004,1234))
print(checkPin(1004, 1234))
print(findAccountData(1))


        








