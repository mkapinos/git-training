import { AssignedCards } from "./assigned-cards";
import { Operation } from "./operation";
import { UserData } from "./user.data";

export class UserAccount {
    userId: number;
    firstName: string;
    lastName: string;
    assignedCards: AssignedCards[]

    constructor(data: UserData) {
        this.userId = data.id;
        this.firstName = data.first_name;
        this.lastName = data.last_name;
        this.assignedCards = data.assignedCards.map((item) => new AssignedCards(item));
    }
}
