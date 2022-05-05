import { UserAccount } from "../models/user-account";
import { UserData } from "../models/user.data";

const mysql = require('sync-mysql')

export class BankProvider {

    private static instance: BankProvider;

    public static getInstance(): BankProvider {
        if (!BankProvider.instance) {
            BankProvider.instance = new BankProvider();
        }
        return BankProvider.instance;
    }

    connection: any;

    private constructor(){
        this.connection = new mysql({
            host:'localhost',
            user:'root',
            password:'root',
            database:'bankomat'
        })
    }

    public checkPin(
        cardNumber: number,
        pin: number
    ): boolean {
        return !!this.findAccount(cardNumber, pin);
    }

    private findAccount(cardNumber: number,
                        pin: number | string): UserAccount | undefined {

        const query = 'SELECT * from cards WHERE cards.number = ? AND cards.pin = ?';

        const result = this.connection.query(query, [cardNumber, pin])

        if (result && result[0]) {
            const accountId = result[0].account_id;

            const accResult = this.connection.query(
                'SELECT * from accounts WHERE accounts.id = ?',
                [accountId]
            );

            const account = accResult[0];
            if (account) {
                const accountData: UserData = {
                    id: account.id,
                    first_name: account.first_name,
                    last_name: account.last_name,
                    email: account.last_name,
                    gender: account.gender,
                    yearOfBorn: account.year_of_born,
                    operations: [],
                    assignedCards: [],
                }
                return new UserAccount(accountData);
            }
        }

        return;
    }

    public payOut(
        cardNumber: number,
        pin: number,
        amount: number
    ){
        const account = this.findAccount(cardNumber, pin);
        if (account) {
            const balance = this.getAccountBalance(account);
            if(balance >= amount){
                this.addOperation(account, -amount);
                return true
            } else {
                console.log(`niewystarczajace srodki \n na koncie: ${balance} \n do wyplacenia: ${amount}` )
            }
        } else {
            console.log("invalid authorisation")
        }

        return false;
    }

    public payIn(
        cardNumber: number,
        pin: number,
        amount: number
    ){
        const account = this.findAccount(cardNumber, pin);
        if (account) {
            this.addOperation(account, amount);
            return true
        } else {
            console.log("invalid authorisation")
        }
        return false;
    }

    public checkBalanceFromBank(
        cardNumber: number,
        pin: number | string
    ): number | null {
        const account = this.findAccount(cardNumber, pin);
        if (account) {
            return this.getAccountBalance(account);
        } else {
            console.log("invalid authorisation")
        }
        return null;
    }


    private getAccountBalance(
        userAccount: UserAccount
    ): number {
        const query = 'SELECT COALESCE(sum(amount), 0) AS sum FROM operations WHERE account_id = ?';
        const result = this.connection.query(query, [userAccount.userId]);
        return result[0].sum;
    }

    private addOperation(userAccount: UserAccount, amount: number): number {
        const query = `INSERT INTO operations (date, amount, account_id) VALUES (CURRENT_TIMESTAMP(), ?, ?)`;
        const result = this.connection.query(query, [amount, userAccount.userId]);
        return result.insertId;
    }
}
