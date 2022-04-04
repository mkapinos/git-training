const data: UserData[] = [
  {
    "id": 1,
    "first_name": "Dennison",
    "last_name": "Grainger",
    "email": "dgrainger0@ucoz.ru",
    "gender": "Non-binary",
    "yearOfBorn": 1983,
    "operations": [
      {
        "id": 1,
        "date": "3/5/2021",
        "amount": 375.94
      },
      {
        "id": 2,
        "date": "11/18/2021",
        "amount": -583.76
      },
      {
        "id": 3,
        "date": "1/10/2022",
        "amount": 214.03
      },
      {
        "id": 4,
        "date": "9/19/2021",
        "amount": 342.1
      },
      {
        "id": 5,
        "date": "6/26/2021",
        "amount": -937.85
      },
      {
        "id": 6,
        "date": "3/2/2022",
        "amount": -618.17
      },
      {
        "id": 7,
        "date": "7/2/2021",
        "amount": -542.9
      },
      {
        "id": 8,
        "date": "3/30/2021",
        "amount": -26.49
      },
      {
        "id": 9,
        "date": "9/20/2021",
        "amount": -166.49
      },
      {
        "id": 10,
        "date": "8/15/2021",
        "amount": 804.54
      }
    ]
  }
];

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

interface ElectricVehicle {
  checkBattery(): number;
}

interface AutomateVehicle {
  x: boolean;
}

abstract class Vehicle {
  abstract handlebar: string;
  wheels: number = 4;

  abstract turnOnLights(): string;

  goAhead() {
    return 'goAhead';
  }

}

class Car extends Vehicle {
  handlebar: 'left' | 'right' = 'left';
  clutch: boolean = false;

  turnOnLights() {
    return 'CarTurnOnLights'
  }

}

class ElectricCar extends Car implements ElectricVehicle {
  private battery: number = 100;

  checkBattery(): number {
    return this.battery;
  }
}

class Tractor extends Vehicle {
  handlebar: 'center' = 'center';
  lift: boolean = true;

  turnOnLights() {
    return 'TractorTurnOnLights'
  }
}

class ElectricTractor extends Tractor implements ElectricVehicle, AutomateVehicle {

  x: boolean = false;

  private lion: number = 1;

  checkBattery(): number {
    return this.lion;
  }
}

const tractor = new Tractor();
const eTractor = new ElectricTractor();

const car = new Car();
const eCar = new ElectricCar();

tractor.turnOnLights()
tractor.goAhead()

eTractor.checkBattery()

function checkBattery(object: ElectricVehicle) {
  return object.checkBattery();
}

checkBattery(eCar);
checkBattery(eTractor);





