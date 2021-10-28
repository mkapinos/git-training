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

const codes = loadCsv('../data/kody.csv');

console.log('Count of codes in database: ', codes.length);

// TODO odfiltruj miescowości z zadanego kodu



// TODO pokaż kody dla zadane miejscowości



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
