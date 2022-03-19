import users_data = require('./users_data_logi.json');
const data: userData[] = users_data
// console.log(JSON.stringify(users_data[0]))
// console.log(data)

interface operationData {
    id: number;
    date: string;
    amount: number;
  }

interface assignedCardsData{
    id: number;
    pin: number;
  }

interface userData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    yearOfBorn: number;
    operations: operationData[];
    assignedCards: assignedCardsData[];
  }

  
// class user {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//     gender: string;
//     yearOfBorn: number;
  
//     constructor(data: userData) {
//       this.id = data.id;
//       this.firstName = data.first_name;
//       this.lastName = data.last_name;
//       this.email = data.email;
//       this.gender = data.gender;
//       this.yearOfBorn = data.yearOfBorn;
//     }
//   }

  class userAccount {
    userId: number;
    // operations: Operation[];
    saldo: number;
    firstName: string;
    lastName: string;
    assignedCards: assignedCards[]
  
    constructor(data: userData) {
      this.userId = data.id;
    //   this.operations = data.operations.map((item) => new operation(item));
      this.saldo = data.operations.reduce((prev, curr) => {
        prev += curr.amount; 
        return prev
    }, 0)
      this.firstName = data.first_name;
      this.lastName = data.last_name;
      this.assignedCards = data.assignedCards.map((item) => new assignedCards(item));
    }
  }

  class assignedCards {
      id: number;
      pin: number;
      constructor(data: assignedCardsData){
          this.id = data.id
          this.pin = data.pin
      }
  }

//   class operation {
//     id: number;
//     date: string;
//     amount: number;
//     constructor(data: operationData) {
//       this.id = data.id;
//       this.date = data.date;
//       this.amount = data.amount;
//     }
//   }

  class Card {
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

class BankProvider {
    accountsData: userAccount[] 
    

    constructor(data: any){
        // this.accountsData = data.foreach((item:number) => new userAccount(data[item]))
        // this.accountsData = data.map((item:userData) => new userAccount(item))
        // this.accountsData = data
        this.accountsData = data.map((item:userData) => new userAccount(item))
    }


    public chcekPin(
        
        cardNumber: number,
        pin: number
    ){
        let a:boolean = false
        this.accountsData.map((item:userAccount) => item.assignedCards.map((el:assignedCards) => {
            if(el.id === cardNumber){
                    if(el.pin === pin){
                        a = true
                    }
                    else console.log("invalid pin")
            }
            // else if - można dodać funkcjonalnośc która sprawdza czy numer karty w ogle isntnieje ale nwm jak
        }))
        return a


    }

    public payOut(
        cardNumber: number,
        pin: number,
        amount: number
    ){
        let a:boolean = false
        this.accountsData.map((item:userAccount) => item.assignedCards.map((el:assignedCardsData) => {
            if(el.id === cardNumber){
                    if(el.pin === pin){
                        if(item.saldo >= amount){
                            
                            a = true
                            // return true
                        }
                        else console.log(`niewystarczajace srodki \n na koncie: ${item.saldo} \n do wyplacenia: ${amount}` )
                    }
                    else console.log("invalid pin")
                }
            // else if - można dodać funkcjonalnośc która sprawdza czy numer karty w ogle isntnieje ale nwm jak
            }))
            return a
    }
}

class ChasMachine {
    private bankProvider: BankProvider
    private stateOfMoney: number
    private inputedCard?: Card
    private inputedPin?: number
    private imputedAmount?: number
    private logingCode?: string
    private maintenanceLogingCode: number

    constructor (a:number, data: any, maintenanceCode:number){
        this.stateOfMoney = a
        this.bankProvider = new BankProvider(data)
        this.maintenanceLogingCode = maintenanceCode
    }


    public insertCard(card: Card){
        if(this.inputedCard){
        return console.log("Error")
        }
        else this.inputedCard = card
    }

    public insertPin(pin: number){
        this.inputedPin = pin
    }
    
    public logIn(){
        if (this.checkPinInBank()){
            console.log("you are succesfully logged")
            this.logingCode = "loggingCode"
        }
         
    }

    public insertAmount(amount: number){
        if (this.logingCode === "loggingCode"){
                if(this.stateOfMoney >=amount ){
                this.imputedAmount = amount
                console.log(`cash to withrdaw: ${amount}`)
                }
                else console.log(`sorry atm have not enought cash to withdraw`)
            }
            else console.log(`you must first log in`)
    }

    public payOut(){
        if(this.logingCode === "loggingCode"){
            if (this.imputedAmount && this.payOutFromBank()){
                    this.stateOfMoney -= this.imputedAmount
                    console.log(`You wirdawed ${this.imputedAmount}`)
            }
            else console.log(`you must first insert amout of money you want withdraw`)
        }
        else console.log(`you must first log in`)
    }

    public maintenance(code: number, maintenance: number){
        if (this.maintenanceLogingCode === code){
            if(maintenance === 1){
                this.checkAtmStatus()
            }
            else if(maintenance === 2){
                console.log(`opening cashbox`)
            }
            else if(maintenance === 3){
                console.log(`restaring...`)
            }
            else console.log(`comend unrecognized`)

        }
        else console.log(`wrong maintenence code`)
    }
    
    private checkAtmStatus(){
        return console.log(`money left in casbox ${this.stateOfMoney}`)
    }

    private checkPinInBank(){
        if(this.inputedCard?.id && this.inputedPin){
        return this.bankProvider.chcekPin(this.inputedCard.id, this.inputedPin)
        }
    }

    private payOutFromBank(){
        if(this.inputedCard?.id && this.inputedPin && this.imputedAmount){
        return this.bankProvider.payOut(this.inputedCard.id, this.inputedPin, this.imputedAmount)
        }
    }


}
const atm = new ChasMachine(10000, data, 12345)

const card1 = new Card(1001, 12, "Jan", "Kowalski", new Date ())

atm.insertCard(card1)

atm.insertPin(1234)

atm.logIn()

atm.insertAmount(100)

atm.payOut()

atm.maintenance(12345, 1)

// atm.checkMoneyInATM()

// const userAccount1 = new userAccount(data[0]);
// console.log(userAccount1);

// const bankprovider1 = new BankProvider(data)
// if (bankprovider1.payOut(1001, 1234, 10) === true){
//  console.log("AAA")
// }

// console.log(bankprovider1)

// data.map((item:any) => item.assignedCards.forEach((el:assignedCards) => 
//         console.log(el.id) ))
// const a1 = new userAccount(data[0])
// console.log(a1)