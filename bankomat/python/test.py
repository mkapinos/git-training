from bankomat import UserData
from bankomat import UserAccount

user1 = UserData(1, "Ala", "Kowalska", "a@a.com", "female", 2003, [1], [2])
print(user1.__str__())
userAcc = UserAccount(1, "Ala", "Kowalska", [1], [2])
print(userAcc.__str__())
