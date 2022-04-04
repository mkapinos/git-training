let x = 0;
let y = 1;
if (1) x = 1;
y = 2;

console.log({x, y})

function test1() {
    const arr = [{value: 1}, {value: 2}, {value: 3}];
    for (let i = 0;i<arr.length;i++) {
        if (arr[i].value === 2) {
            return arr[i];
        }
    }
}
console.log('test1', test1());

function test2() {
    const arr = [{value: 1}, {value: 2}, {value: 3}];

    // return arr.find(item => (item.value === 2));

    // let retValue;
    // arr.forEach(item => {
    //     if (item.value === 2) {
    //         retValue = item;
    //     }
    // });
    // return retValue;

    // return arr.map(item => {
    //     if (item.value === 2) {
    //         return item;
    //     } else {
    //         return 0
    //     }
    // });
    // return arr.forEach(item => {
    //     if (item.value === 2) {
    //         return item;
    //     }
    // });
}
console.log('test2', test2());
