"use strict";

function main() {

    function sum(a, b) {
        return a + b;
    }
    
    const result = sum(1, 3);
    console.log({result}, sum(1,7), sum(1, 6), sum(1, 35));
    
    for (let i = 0; i < 5; i++) {
        var el2 = 'el2';
        const x = 'x';
        let y = 'y';
    }
    console.log(el2);
    
    function check(el) { 
       console.log('check el', el, el2, typeof el === 'number'); 
       return typeof el === 'number';
    }
    
    check(1);
    
    const arr = [1,2,3,4,5,6,7];
    arr.push(4);
    
    const obj = {x: 1, y:1};
    obj.x = 2;
    delete obj.x;
    delete obj.y;

    console.log({obj});

    const ox = {};
    const oy = {};
    console.log('Porownanie oektow', ox === oy);

    let s = 0;
    arr.forEach(el => {
        s += el;
    });
    console.log({s});
    
    console.log({el2});

    if (el2 === 'el2') {
        console.log('Na dzisiaj koniec');
    }
}
main();