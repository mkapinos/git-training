import functools

from Operation import Operation
from AssignedCards import AssignedCards

class UserAccount():

    def __init__(self, data):
        self.id = data["id"]
        self.name = data["first_name"]
        self.surname = data["last_name"]
