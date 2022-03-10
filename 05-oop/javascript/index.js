const data = require("../data.json");
// console.log({data});

// sprawdź ile ludzie mają na koncie kasy

// programowanie strukturalne
console.log('== programowanie strukturalne ==')

function calculateUserMoney(user) {
  if (user && user.operations) {
    let sum = 0;
    for (let i = 0; i<user.operations.length; i++) {
      sum += user.operations[i].amount;
    }
    return sum;
  } else {
    return 0;
  }
}

function displayAccount(user) {
  return user.first_name + ' '
    + user.last_name + ': '
    + calculateUserMoney(user);
}

for(let i = 0; i < data.length; i++) {
  console.log(displayAccount(data[i]));
}

// programowanie funkcyjne

console.log('== programowanie funkcyjne ==')

data.map(user => {
  return {
    name: user.first_name + ' '+ user.last_name,
    sum: user.operations.reduce((prev, curr) => {
      prev += curr.amount;
      return prev;
    }, 0)
  }
}).map(nameSum => nameSum.name + ': ' + nameSum.sum)
  .forEach(display => {
    console.log(display)
  });


// programowanie obiektowe

console.log('== programowanie obiekt ==')

class UserAccount {

  name;
  data;

  constructor(data) {
    this.data = data;
    this.name = data.first_name + ' ' + data.last_name;
  }

  sum() {
    return this.data.operations.reduce((prev, curr) => {
      prev += curr.amount;
      return prev;
    }, 0)
  }

  display() {
    return this.name + ': ' + this.sum();
  }
}

data.forEach(item => {
  const user = new UserAccount(item);
  console.log(user.display());
})
