const csv = require('./csv');

const codes = csv.load('../__data/kody.csv');

console.log('Count of codes in database: ', codes.length);

//////////////////////////// ARRAY //////////////////////////////////

// get part of array



// for (let i = 0; i<10; i++){
//   console.log(codes[i])
// }

//console.log(codes.slice(5,10))

//codes.slice(5,10).forEach(obj => console.log(obj))

// for ( let el of codes.slice(5,10)){
//   console.log(el)
// }



//acces of properties of object

// for (let prop in codes[0]){
//   console.log(prop, codes[0][prop])
// }

// console.log(Object.values(codes[0]))
// console.log(Object.keys(codes[0]))
// const obj = codes[0]
// Object.keys(obj).forEach(prop => console.log(prop, obj[prop]))

// pop pop, shift, splice
function log(a){ console.log(a)};
// log(codes.length) 
// log(codes.pop())
// log(codes.length)

// log(codes.length) 
// log(codes.shift())
// log(codes.length)


// log(codes.length) 
// log(codes.splice(10, 10, "aAAAAAa"))
// log(codes.length)
// log(codes[10])

// delete form array

// log(codes[1])
// log(codes.length) 
// delete codes[1]
// log(codes[1])
// log(codes.length) 

// log(codes[1])
 
// delete codes[1]['city']
// log(codes[1])

const x = [{x: [{v: 1}]}]
log(x[0]["x"][0]["v"])
log(x[0].x[0].v)
// add to array


// filtering


// maping


// reducing

// join

//////////////////////////// STRING //////////////////////////////////

// to array


// split


// find in


// find pos of text


// replace

