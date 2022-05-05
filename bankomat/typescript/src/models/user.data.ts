import { AssignedCardsData } from "./assigned-cards.data";
import { OperationData } from "./operation.data";

export interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    yearOfBorn: number;
    operations: OperationData[];
    assignedCards: AssignedCardsData[];
}
