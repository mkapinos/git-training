const fs = require('fs');

module.exports = {
    load: function(filePath) {
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
}
