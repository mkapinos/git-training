"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var Card = /** @class */ (function () {
    function Card(id, csv, name, surname, exp_date) {
        this.id = id;
        this.CSV_code = csv;
        this.firstName = name;
        this.lastName = surname;
        this.exp_date = exp_date;
    }
    return Card;
}());
exports.Card = Card;
