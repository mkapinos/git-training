"use strict";

console.log("hello world");
var x = 123;
console.log(x);
x = "1";
console.log(x);
var y = 123;
var z = 123.45;

console.log(y + x);
console.log(1 == '1');
console.log(1 === "1");
console.log(1/0);

console.log(1 * 'a');

console.log(NaN == NaN);
console.log(NaN === NaN);

var b = true;

var arr = [1, 2, 3, 4, 5, 6, 'a', [x,y,z]];

var car = {
    model: 'Porshe',
    engine: '1.8',
    wheels: {
        lf: true,
        rf: true,
        lb: true,
        rb: true,
    },
    doors: 5,
};
var car2 = {
    model: 'Volvo',
    engine: '2.8',
    wheels: {
        lf: true,
        rf: true,
        lb: true,
        rb: true,
    },
    doors: 5,
};
arr.push(car);
arr.push(car2);

console.log(arr, arr[7][1], arr[100], arr[4][1]);

var el = 123;

function check(el) {
   console.log('check el', el, typeof el === 'number'); 
   return typeof el === 'number';
}

var numbers2 = arr.filter(check);

var numbers = arr.filter((el) => typeof el === 'number');

console.log(numbers);

var func = function () {
}

console.log(typeof x, typeof y, typeof z, typeof b, 
    typeof arr, Array.isArray(arr), typeof car, Array.isArray(car), 
    typeof func
    );






