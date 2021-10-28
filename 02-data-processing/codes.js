const fs = require('fs');

function loadCsv(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  const list = data.split('\n').map(item => item.trim());
  const attribs = list.shift().split(';');
  return list.filter(item => !!item).map(item => {
    const codeItem = {};
    item.split(';').forEach((value, index) => {
      codeItem[attribs[index]] = value;
    });
    return codeItem;
  });
}

const codes = loadCsv('../__data/kody.csv');

console.log('Count of codes in database: ', codes.length);

// TODO odfiltruj miescowości z zadanego kodu

// codes.length

for (let i = 0; i < 3; i++) {
  const item = codes[i];
  console.log(item.id);
}

// for (let item of codes) {
//   console.log(item);
// }

codes
  .filter((item, index) => {
    return index < 3;
  })
  .forEach(item => {
    console.log(item);
  });

const numbers = [2, 4, 3, 6, 87];

function checkPar(num) {
  return num % 2 === 0;
}

const par = numbers.filter(checkPar);
console.log(par);



// TODO pokaż kody dla zadane miejscowości
function checkCodeCityMielec(obj) {
  return obj.city === 'Mielec';
}
// console.log(codes[0]);
const mielecCodes = codes.filter(checkCodeCityMielec);
console.log(mielecCodes);

const checkMielec = function(obj) {
  return obj.city === 'Mielec';
}
const checkMielec2 = (obj) => {
  return obj.city === 'Mielec';
};

// console.log(codes[0]);
const mielecCodes2 = codes.filter(checkMielec);
console.log(mielecCodes2);

const mielecCodes3 = codes.filter((obj) => {
  return obj.city === 'Mielec';
});
console.log(mielecCodes3);

const mielecCodes4 = codes.filter((obj) => obj.city === 'Mielec');
console.log(mielecCodes4);

function checkUniq(el, index, self) {
  return self.indexOf(el) === index;
}

// przetworzyć na tablice unikalnych codow dla miasta
const coodesList = codes
    .filter((obj) => obj.city === 'Brzesko')
    .filter((el, index) => index < 3)
    .map((el => {
      return el.code;
    }))
    .filter(checkUniq)
  ;
console.log('Brzesko', coodesList);

function getCodes(list, city) {
  return list
    .filter((obj) => obj.city === city)
    .map((el => {
      return el.code;
    }))
    .filter(checkUniq)
  ;
}
console.log('Wieliczka', getCodes(codes, 'Wieliczka'));
console.log('Kraków', getCodes(codes, 'Kraków'));

// rozszezenie classy array
Array.prototype.getCodes = function(city) {
  return this
    .filter((obj) => obj.city === city)
    .map((el => {
      return el.code;
    }))
    .filter(checkUniq)
  ;
}
console.log('Tarnów', codes.getCodes('Tarnów'));
console.log('X', [{city: 'X', code: '123'}, {city: 'X', code: '123'}].getCodes('X'));

// TODO pokaż top 10 z największą ilością unikalnych kodów
const groupByCodes = {};
codes.forEach(code => {
  if (!groupByCodes[code.city]) {
    groupByCodes[code.city] = {
      codesCount: 0,
      codes: [],
      city: code.city,
    }
  }
  if (!groupByCodes[code.city].codes.includes(code.code)) {
    groupByCodes[code.city].codesCount++;
    groupByCodes[code.city].codes.push(code.code);
  }
});
console.log('Top 10 of quantity of codes by cities');
Object.values(groupByCodes)
  .sort((a, b) => b.codesCount - a.codesCount)
  .splice(0, 10)
  .map((item, index) => ({index, city: item.city, count: item.codesCount}))
  .forEach(item => {
    console.log(`${item.index + 1}. ${item.city}: ${item.count}`);
  });




  
// TODO stwórz drzewo wojewodzto / miejsocwość / kody z automatycznym obliczeniem ile w danym węźle jest unikalnych kodów

/*
 TODO wykorzystując wcześniej przygotowane drzewo wyświetl statystyki w następujący sposób:
 ********************************
 mazowieckie: 12312 kodów
 - Warszawa: 4195 kodów
 - ....
 ********************************
 małopolskie: 12312 kodów
 - Kraków: 1127 kodów
 - ....
 ....
 */
