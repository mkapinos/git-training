class Test {

    static staticA: string = 'Bolek Lolek';

    a: string = 'Ala ma kota';
}

const t1 = new Test();
const t2 = new Test();

console.log('t1==t2', t1 == t2);

class TestSingleton {

    a = 'Ala ma kota';

    private static instance: TestSingleton;

    static createInstance() {
        if (!TestSingleton.instance) {
            TestSingleton.instance =  new TestSingleton();
        }
        return TestSingleton.instance;
    }

    private constructor() {
    }
}

const s1 = TestSingleton.createInstance();
const s2 = TestSingleton.createInstance();

console.log('s1==s2', s1 == s2);


console.log({
    t1: t1.a,
    t2: t2.a,
    s1: s1.a,
    s2: s2.a,
    staticA: Test.staticA});

Test.staticA = 'Hania';

s1.a = 'Test 1';
t2.a = 'Test 1';

console.log({
    t1: t1.a,
    t2: t2.a,
    s1: s1.a,
    s2: s2.a,
    staticA: Test.staticA});
t1.a = 'Test 2';

console.log({
    t1: t1.a,
    t2: t2.a,
    s1: s1.a,
    s2: s2.a,
    staticA: Test.staticA});

