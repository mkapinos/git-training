def mapToObj(item, attribs):
    codeItem = {}
    splited = item.split(';')
    index = 0
    for value in splited:
      codeItem[attribs[index]] = value
      index += 1

    return codeItem

def loadCsv(filePath):
    f = open(filePath, "r", encoding='utf-8')
    data = f.read()
    list = data.split('\n');
    
    attribs = list.pop(0).split(';')

    # print(mapToObj(list[0], attribs))
    objectList = [];
    for item in filter(lambda item: item, list):
        objectList.append(mapToObj(item, attribs))

    return objectList

codes = loadCsv('../__data/kody.csv')


print('First record', codes[0]);

# wyszukaj miast zaczunających się na jakiś ciąg znaków


print(list(map(lambda item: item['city'], filter(lambda item: 'Miel' in item['city'], codes))))
print(set(map(lambda item: item['city'], filter(lambda item: 'Miel' in item['city'], codes))))

#console.log(ExampleCity);



# wyszukaj kodów zaczunających się ...


# console.log(codeCity);


# wylistuj ilość miast w wojewudztwie


# console.log(exampleRegion);

# wyswielt wszystkie miasta ktore nie są unikalne
