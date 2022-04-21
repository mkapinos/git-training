const fs = require('fs');

function readData() {
  return require('./temporary_log.json');
}

function writeData(a) {fs.writeFile('./temporary_log.json', JSON.stringify(a), (err) => {
  if (err){
    console.log(err)
  }
})}

class UserAccount {
  userId;
  operations;
  firstName;
  lastName;
  assignedCards;

  constructor(data) {
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
  id;
  pin;
  constructor(data){
    this.id = data.id
    this.pin = data.pin
  }
}

class Operation {
  id;
  date;
  amount;
  constructor(data) {
    this.id = data.id;
    this.date = data.date;
    this.amount = data.amount;
  }
}

class Card {
  id
  CSV_code
  firstName
  lastName
  exp_date

  constructor (id,
               csv,
               name,
               surname,
               exp_date
  ){
    this.id = id
    this.CSV_code = csv
    this.firstName = name
    this.lastName = surname
    this.exp_date = exp_date
  }
}

class BankProvider {

  static instance;

  accountsData
  data

  static getInstance() {
    if (!BankProvider.instance) {
      BankProvider.instance = new BankProvider();
    }
    return BankProvider.instance;
  }

  constructor(){
    this.data = readData();
    this.refreshUsersAccounts();
  }

  checkPin(
    cardNumber,
    pin
  ) {
    return !!this.findAccount(cardNumber, pin);
  }

  findAccount(cardNumber,
                      pin) {
    return this.accountsData.find(item => {
      return item.assignedCards.find(card => card.id === cardNumber && card.pin === pin)
    });
  }
  findAccountData(id) {
    return this.data.find(item => item.id === id);
  }

  payOut(
    cardNumber,
    pin,
    amount
  ){
    const account = this.findAccount(cardNumber, pin);
    if (account) {
      if(account.getBalance() >= amount){

        let operationData = {id: account.operations.length+1, date:new Date, amount:-amount}

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

  checkeBalanceFromBank(
    cardNumber,
    pin
  ) {
    const account = this.findAccount(cardNumber, pin);
    if (account) {
      return account.getBalance();
    } else {
      console.log("invalid authorisation")
    }
    return null;
  }

  refreshUsersAccounts() {
    this.accountsData = this.data.map((item) => new UserAccount(item));
  }
}

class CashMachine {
  bankProvider
  stateOfMoney
  inputedCard
  inputedPin
  imputedAmount
  isLogged = false;
  maintenanceLogingCode

  constructor (stateOfMoney, maintenanceCode){
    this.stateOfMoney = stateOfMoney
    this.bankProvider = BankProvider.getInstance()
    this.maintenanceLogingCode = maintenanceCode
  }


  insertCard(card){
    if(this.inputedCard){
      return console.log("Error")
    } else {
      this.inputedCard = card
    }
  }

  insertPin(pin){
    this.inputedPin = pin
  }

  logIn(){
    if (this.checkPinInBank()){
      console.log("you are succesfully logged")
      this.isLogged = true
    }
  }

  insertAmount(amount){
    if (this.isLogged){
      if(this.stateOfMoney >=amount ){
        this.imputedAmount = amount
        console.log(`cash to withrdaw: ${amount}`)
      }
      else console.log(`sorry atm have not enought cash to withdraw`)
    }
    else console.log(`you must first log in`)
  }

  payOut(){
    if(this.isLogged){
      if (this.imputedAmount && this.payOutFromBank()){
        this.stateOfMoney -= this.imputedAmount
        console.log(`You wirdawed ${this.imputedAmount}`)
      }

    }
    else console.log(`you must first log in`)
  }

  maintenance(code, maintenance){
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

  checkBalance(){
    if(this.isLogged){
      if(this.inputedCard && this.inputedCard.id && this.inputedPin){
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

  checkAtmStatus(){
    return console.log(`money left in casbox ${this.stateOfMoney}`)
  }

  checkPinInBank(){
    if(this.inputedCard && this.inputedCard.id && this.inputedPin){
      return this.bankProvider.checkPin(this.inputedCard.id, this.inputedPin)
    } else {
      console.log(`you must first insert amout of money you want withdraw`)
    }
  }

  payOutFromBank(){
    if(this.inputedCard && this.inputedCard.id && this.inputedPin && this.imputedAmount){
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

// data.map((item) => item.assignedCards.forEach((el:assignedCards) => 
//         console.log(el.id) ))
// const a1 = new userAccount(data[0])
// console.log(a1)


