class Operation():
    def __init__(self, data):
        self.operationId = data["id"]
        self.operationDate = data["date"]
        self.moneyNum = data["amount"]
