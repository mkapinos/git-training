const fs = require('fs');
const { setMaxListeners } = require('process');

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

// wyszukaj miast zaczunających się na jakiś ciąg znaków




//console.log(ExampleCity);


// wyszukaj kodów zaczunających się ...


//console.log(codeCity);


// wylistuj ilość miast w wojewudztwie


//console.log(exampleRegion);

// wyswielt wszystkie miasta ktore nie są unikalne
