import { OperationData } from "./operation.data";

export class Operation {
    id: number;
    date: Date;
    amount: number;
    constructor(data: OperationData) {
        this.id = data.id;
        this.date = data.date;
        this.amount = data.amount;
    }
}
