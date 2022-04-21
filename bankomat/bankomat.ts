const fs = require('fs');

function readData() {
    return require('./accounts.json');
}

function writeData(a:any) {fs.writeFile('./accounts.json', JSON.stringify(a), (err:any) => {
    if (err){
        console.log(err)
    }
})}

interface OperationData {
    id: number;
    date: any;
    amount: number;
  }

interface AssignedCardsData{
    id: number;
    pin: number;
  }

interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    yearOfBorn: number;
    operations: OperationData[];
    assignedCards: AssignedCardsData[];
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

  class UserAccount {
    userId: number;
    operations: Operation[];
    firstName: string;
    lastName: string;
    assignedCards: AssignedCards[]
  
    constructor(data: UserData) {
      this.userId = data.id;
      this.operations = data.operations.map((item) => new Operation(item));
      this.firstName = data.first_name;
      this.lastName = data.last_name;
      this.assignedCards = data.assignedCards.map((item) => new AssignedCards(item));
    }

    getBalance() {
        return this.operations.reduce((prev, curr) => {
            prev += curr.amount;
            return prev
        }, 0)
    }
  }

  class AssignedCards {
      id: number;
      pin: number;
      constructor(data: AssignedCardsData){
          this.id = data.id
          this.pin = data.pin
      }
  }

  class Operation {
    id: number;
    date: Date;
    amount: number;
    constructor(data: OperationData) {
      this.id = data.id;
      this.date = data.date;
      this.amount = data.amount;
    }
  }

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

    private static instance: BankProvider;

    private accountsData!: UserAccount[]
    private data: UserData[];

    public static getInstance(): BankProvider {
        if (!BankProvider.instance) {
            BankProvider.instance = new BankProvider();
        }
        return BankProvider.instance;
    }

    private constructor(){
        this.data = readData();
        this.refreshUsersAccounts();
    }

    public checkPin(
        cardNumber: number,
        pin: number
    ): boolean {
        return !!this.findAccount(cardNumber, pin);
    }

    private findAccount(cardNumber: number,
                        pin: number): UserAccount | undefined {
        return this.accountsData.find(item => {
            return item.assignedCards.find(card => card.id === cardNumber && card.pin === pin)
        });
    }
    private findAccountData(id: number): UserData | undefined {
        return this.data.find(item => item.id === id);
    }

    public payOut(
        cardNumber: number,
        pin: number,
        amount: number
    ){
        const account = this.findAccount(cardNumber, pin);
        if (account) {
            if(account.getBalance() >= amount){

                let operationData: OperationData = {id: account.operations.length+1, date:new Date, amount:-amount}

                account.operations.push(new Operation(operationData))

                const accountData = this.findAccountData(account.userId);
                if (accountData) {
                    accountData.operations.push(operationData);
                    writeData(this.data)
                }

                return true
            } else {
                console.log(`niewystarczajace srodki \n na koncie: ${account.getBalance()} \n do wyplacenia: ${amount}` )
            }
        } else {
            console.log("invalid authorisation")
        }

        return false;
    }

    public checkeBalanceFromBank(
        cardNumber: number,
        pin: number
    ): number | null {
        const account = this.findAccount(cardNumber, pin);
        if (account) {
            return account.getBalance();
        } else {
            console.log("invalid authorisation")
        }
        return null;
    }

    private refreshUsersAccounts() {
        this.accountsData = this.data.map((item:UserData) => new UserAccount(item));
    }
}

class CashMachine {
    private bankProvider: BankProvider
    private stateOfMoney: number
    private inputedCard?: Card
    private inputedPin?: number
    private imputedAmount?: number
    private isLogged = false;
    private maintenanceLogingCode: number

    constructor (stateOfMoney:number, maintenanceCode:number){
        this.stateOfMoney = stateOfMoney
        this.bankProvider = BankProvider.getInstance()
        this.maintenanceLogingCode = maintenanceCode
    }


    public insertCard(card: Card){
        if(this.inputedCard){
            return console.log("Error")
        } else {
            this.inputedCard = card
        }
    }

    public insertPin(pin: number){
        this.inputedPin = pin
    }
    
    public logIn(){
        if (this.checkPinInBank()){
            console.log("you are succesfully logged")
            this.isLogged = true
        }
    }

    public insertAmount(amount: number){
        if (this.isLogged){
                if(this.stateOfMoney >=amount ){
                this.imputedAmount = amount
                console.log(`cash to withrdaw: ${amount}`)
                }
                else console.log(`sorry atm have not enought cash to withdraw`)
            }
            else console.log(`you must first log in`)
    }

    public payOut(){
        if(this.isLogged){
            if (this.imputedAmount && this.payOutFromBank()){
                    this.stateOfMoney -= this.imputedAmount
                    console.log(`You wirdawed ${this.imputedAmount}`)
            }
            
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

    public checkBalance(){
        if(this.isLogged){
            if(this.inputedCard?.id && this.inputedPin){
                const saldo = this.bankProvider.checkeBalanceFromBank(this.inputedCard.id, this.inputedPin)
                if (saldo === null) {
                    console.log(`Unknown saldo in your bank account`)
                } else {
                    console.log(`You have ${saldo} money in your bank account`)
                }
            }
        } else {
            console.log(`you must first insert amout of money you want withdraw`)
        }
    }
    
    private checkAtmStatus(){
        return console.log(`money left in casbox ${this.stateOfMoney}`)
    }

    private checkPinInBank(){
        if(this.inputedCard?.id && this.inputedPin){
            return this.bankProvider.checkPin(this.inputedCard.id, this.inputedPin)
        } else {
            console.log(`you must first insert amout of money you want withdraw`)
        }
    }

    private payOutFromBank(){
        if(this.inputedCard?.id && this.inputedPin && this.imputedAmount){
        return this.bankProvider.payOut(this.inputedCard.id, this.inputedPin, this.imputedAmount)
        }
    }
}

const atm = new CashMachine(10000, 12345)

const card1 = new Card(1001, 12, "Jan", "Kowalski", new Date ())

atm.insertCard(card1)

atm.insertPin(1234)

atm.logIn()

atm.checkBalance()

atm.insertAmount(199)

atm.payOut()
//
// atm.checkBalance()

// atm.maintenance(12345, 1)

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


