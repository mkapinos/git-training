
import res from './data';

const data = res as UserData[];
// console.log({data})

interface OperationData {
  id: number;
  date: string;
  amount: number;
}
interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  yearOfBorn: number;
  operations: OperationData[]
}

class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  yearOfBorn: number;

  constructor(data: UserData) {
    this.id = data.id;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.email = data.email;
    this.gender = data.gender;
    this.yearOfBorn = data.yearOfBorn;
  }

  calculateAge() {
    return 2022 - this.yearOfBorn;
  }

  toString() {
    return this.firstName + ' ' + this.lastName;
  }

  toJSON() {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      gender: this.gender,
      yearOfBorn: this.yearOfBorn,
      age: this.calculateAge()
    }
  }
}

class Europejczyk extends User {
  toString() {
    return this.lastName + ' ' + this.firstName;
  }
}

class UserAccount {
  userId: number;
  operations: Operation[];

  private createdAt: Date = new Date();

  constructor(data: UserData) {
    this.userId = data.id;
    this.operations = data.operations.map((item) => new Operation(item));
  }
}

class Operation {
  id: number;
  date: string;
  amount: number;
  constructor(data: OperationData) {
    this.id = data.id;
    this.date = data.date;
    this.amount = data.amount;
  }
}

const user1 = new User(data[0]);
const user2 = new User(data[0]);
const userAccount1 = new UserAccount(data[0]);

// console.log(data[0]);
// console.log(user1);
// console.log(userAccount1);

// console.log('user1 is user: ', user1 instanceof User);
// console.log('userAccount1 is user: ', userAccount1 instanceof User);
//
// console.log('typeof data[0]: ', typeof data[0]);
// console.log('typeof data: ', typeof data);
// console.log('is array: ', Array.isArray(data));
//
// const x = 1;
// console.log('typeof x: ', typeof x);
// const y = 'abc';
// console.log('typeof y: ', typeof y);
// const z = true;
// console.log('typeof z: ', typeof z);
// const a: any = {};
// console.log('typeof a: ', typeof a);
// const b: any[] = [];
// console.log('typeof b: ', typeof b);

let message = 'Hello, ' + user1;
console.log(message);
user1.lastName = 'Kowalski';
message = 'Hello, ' + user1;
console.log(message);
message = 'Hello, ' + user2;
console.log(message);

const jsonString = JSON.stringify(user2);
console.log(jsonString);


// console.log(JSON.)

abstract class Base {

  public readonly accountNumber: string = '';
  protected pin: string;

  abstract run(): void;

  checkPin(pin: string): boolean {
    return this.pin === pin;
  }

  constructor(pin: string) {
    this.pin = pin;
  }

}

interface Editable {
  edit(): void;
}

class Animal extends Base {
  protected legsCount: number = 4;
  run() {
    console.log('Animal is running');
  }
}

class Dog extends Animal {

  run() {
    this.legsCount++;
    console.log('Animal is running');
  }
}

class Person extends Base implements Editable {
  run() {
    console.log('Person is running');
  }

  edit() {
    console.log('Person is edditing');
  }
}

class Car implements Editable {
  edit() {
    console.log('Car is edditing');
  }
}

const animal1 = new Animal('abc');
const person1 = new Person('abc');
const car1 = new Car();

console.log(animal1.accountNumber);

const arr = [animal1, person1, car1];

arr.forEach(item => {
  if (item instanceof Base) {
    item.run();
  }
});




