import functools

from Operation import Operation
from AssignedCards import AssignedCards

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
