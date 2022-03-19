const fs = require('fs');

// fs.writeFile ("test.json", JSON.stringify("data"), function(err:any) {
//   if (err) throw err;
//   console.log("complete")
// }
// )


// var obj = {name: "Martin", age: 30, country: "United States"};
 
// var json = JSON.stringify(obj);
 
// console.log(json);





const fileName = './test.json';
var file = require(fileName)



import pre_users_data = require('./users_data_test.json');
const pre_data = pre_users_data
var hmm = pre_data.map((item) => item)
console.log(hmm)
var newOperation = {id:10,date:"aa",amount:213}


// var obj ={id:10,date:"aa",amount:213}
// file.operations = obj
file = hmm

fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err:any) {
  if (err) return console.log(err);
  console.log(JSON.stringify(file));
  console.log('writing to ' + fileName);
});


// import users_dataa = require('./test.json');
// const dataa = users_dataa
// console.log(dataa)








// const Data = [
//     {
//       "id": 1,
//       "first_name": "Dennison",
//       "last_name": "Grainger",
//       "email": "dgrainger0@ucoz.ru",
//       "gender": "Non-binary",
//       "yearOfBorn": 1983,
//       "operations": [
//         {
//           "id": 1,
//           "date": "3/5/2021",
//           "amount": 375.94
//         },
//         {
//           "id": 2,
//           "date": "11/18/2021",
//           "amount": -583.76
//         },
//         {
//           "id": 3,
//           "date": "1/10/2022",
//           "amount": 214.03
//         },
//         {
//           "id": 4,
//           "date": "9/19/2021",
//           "amount": 342.1
//         },
//         {
//           "id": 5,
//           "date": "6/26/2021",
//           "amount": -937.85
//         },
//         {
//           "id": 6,
//           "date": "3/2/2022",
//           "amount": -618.17
//         },
//         {
//           "id": 7,
//           "date": "7/2/2021",
//           "amount": -542.9
//         },
//         {
//           "id": 8,
//           "date": "3/30/2021",
//           "amount": -26.49
//         },
//         {
//           "id": 9,
//           "date": "9/20/2021",
//           "amount": -166.49
//         },
//         {
//           "id": 10,
//           "date": "8/15/2021",
//           "amount": 804.54
//         }
//       ]
//     }
//   ];

// console.log(Data[0].operations[0].amount)
// console.log(Data[0].operations.reduce((prev, curr) => {
//     prev += curr.amount;
//     return prev;
//   }, 0))
