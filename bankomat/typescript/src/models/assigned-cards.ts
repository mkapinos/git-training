import { AssignedCardsData } from "./assigned-cards.data";

export class AssignedCards {
    id: number;
    pin: number;
    constructor(data: AssignedCardsData){
        this.id = data.id
        this.pin = data.pin
    }
}
