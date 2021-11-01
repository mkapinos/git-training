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



const ExampleCity = codes.filter((obj) => {
  return obj.city.startsWith('A') === true;
});
//console.log(ExampleCity);


// wyszukaj kodów zaczunających się ...

const codeCity = codes.filter((obj) => {
  return obj.code.startsWith('30-61') === true;
});
//console.log(codeCity);


// wylistuj ilość miast w wojewudztwie

const exampleRegion = codes.filter((obj) => {
  return obj.region.startsWith('Województwo małopolskie') === true;
});
//console.log(exampleRegion);

// wyswielt wszystkie miasta ktore nie są unikalne

function checkUniq(el, index, self) {
return self.indexOf(el) === index;}

const uniq = codes.map(obj => obj.city).filter(checkUniq)
console.log(uniq)