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

// wyszukaj miast zaczunających się na jakiś ciąg znaków


// wyszukaj kodów zaczunających się ...


// wylistuj ilość miast w wojewudztwie


// wyswielt wszystkie miasta ktore nie są unikalne


