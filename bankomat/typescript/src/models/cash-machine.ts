import { BankProvider } from "../services/bank-provider.service"
import { Card } from "./card"

export class CashMachine {
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

    public logOut(){
        this.isLogged = false;
        this.inputedCard = undefined;
        this.inputedPin = undefined;
        console.log("you are succesfully logout")
    }

    public insertAmount(amount: number){
        if (this.isLogged && amount > 0){
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
            if (this.imputedAmount){
                if (this.payOutFromBank()) {
                    this.stateOfMoney -= this.imputedAmount
                    console.log(`You withdrew ${this.imputedAmount}`)
                    this.imputedAmount = undefined;
                } else {
                    console.log('DB ERROR')
                }
            } else {
                console.log(`Please input amount`)
            }

        }
        else console.log(`you must first log in`)
    }

    public payIn() {
        if(this.isLogged){
            if (this.imputedAmount){
                if (this.payInFromBank()) {
                    this.stateOfMoney += this.imputedAmount
                    console.log(`You deposit ${this.imputedAmount}`)
                    this.imputedAmount = undefined;
                } else {
                    console.log('DB ERROR')
                }
            } else {
                console.log(`Please input amount`)
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

                const saldo = this.bankProvider.checkBalanceFromBank(this.inputedCard.id, this.inputedPin)

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

    private payInFromBank() {
        if(this.inputedCard?.id && this.inputedPin && this.imputedAmount){
            return this.bankProvider.payIn(this.inputedCard.id, this.inputedPin, this.imputedAmount)
        }
    }
}
