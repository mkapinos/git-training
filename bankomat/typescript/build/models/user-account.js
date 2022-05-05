"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccount = void 0;
var assigned_cards_1 = require("./assigned-cards");
var UserAccount = /** @class */ (function () {
    function UserAccount(data) {
        this.userId = data.id;
        this.firstName = data.first_name;
        this.lastName = data.last_name;
        this.assignedCards = data.assignedCards.map(function (item) { return new assigned_cards_1.AssignedCards(item); });
    }
    return UserAccount;
}());
exports.UserAccount = UserAccount;
