export class Card {
    id: number
    CSV_code: number
    firstName: string
    lastName: string
    exp_date: Date

    constructor (id: number,
                 csv: number,
                 name: string,
                 surname: string,
                 exp_date: Date){
        this.id = id
        this.CSV_code = csv
        this.firstName = name
        this.lastName = surname
        this.exp_date = exp_date
    }
}
