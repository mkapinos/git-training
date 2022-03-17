
class BankProvider {

    public checkPin(cardNumber: string,pin: number) {
        return true;
    }

    public payOut(cardNumber: string, pin: number, amount: number): boolean {
        return true;
    }
}

class Card {
    public cardNumber: string;
    public expiredAt: Date;

    constructor(cardNumber: string, expiredAt: Date) {
        this.cardNumber = cardNumber;
        this.expiredAt = expiredAt;
    }
}

class CacheMachine {
    private bankProvider: BankProvider;
    private stateOfMoney: number;
    private inputtedCard?: Card;
    private inputtedPin?: number;
    private inputtedAmount?: number;

    constructor(bankProvider: BankProvider, stateOfMoney: number) {
        this.stateOfMoney = stateOfMoney;
        this.bankProvider = bankProvider;
    }

    public insertCard(card: Card) {
        if (this.inputtedCard) {
            return false;
        }
        this.inputtedCard = card;
    }

    public insertPin(pin: number) {
        this.inputtedPin = pin;
    }

    public insertAmount(amount: number) {
        if (this.stateOfMoney < amount) {
            console.log('ERROR: Cache machone has no money');
        } else {
            this.inputtedAmount = amount;
        }
    }

    public payOut(): boolean {
        if (this.payOutFromBank()) {
            if (this.withdrawMoney()) {
                console.log('SUCCESS: withdraw money. State of money: ' + this.stateOfMoney);
                this.inputtedPin = undefined;
                this.inputtedPin = undefined;
                this.inputtedCard = undefined;
                return true;
            } else {
                console.log('ERROR: withdrawMoney');
                return false;
            }
        } else {
            console.log('ERROR: payOutFromBank');
            return false;
        }
    }

    private withdrawMoney(): boolean {
        if (this.inputtedAmount && this.stateOfMoney > this.inputtedAmount) {
            this.stateOfMoney -= this.inputtedAmount;
            return true;
        } else {
            return false;
        }
    }

    private checkPinInBank(): boolean {
        if (this.inputtedCard?.cardNumber && this.inputtedPin) {
            return this.bankProvider.checkPin(this.inputtedCard?.cardNumber, this.inputtedPin);
        }
        return false;
    }

    private payOutFromBank(): boolean {
        if (this.inputtedCard?.cardNumber && this.inputtedPin && this.inputtedAmount) {
            return this.bankProvider.payOut(this.inputtedCard.cardNumber, this.inputtedPin, this.inputtedAmount);
        }
        return false;
    }
}

const card1 = new Card('abc', new Date());
const card2 = new Card('abc', new Date());

const cacheMachine = new CacheMachine(new BankProvider(), 1000);

cacheMachine.insertCard(card1);
cacheMachine.insertPin(1234);
cacheMachine.insertAmount(999);
cacheMachine.payOut();

cacheMachine.insertCard(card1);
cacheMachine.insertPin(1234);
cacheMachine.insertAmount(999);
cacheMachine.payOut();
