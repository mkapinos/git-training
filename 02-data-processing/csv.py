# Python Module csv

def mapToObj(item, attribs):
    codeItem = {}
    splited = item.split(';')
    index = 0
    for value in splited:
      codeItem[attribs[index]] = value
      index += 1

    return codeItem

def load(filePath):
    f = open(filePath, "r", encoding='utf-8')
    data = f.read()
    list = data.split('\n');
    
    attribs = list.pop(0).split(';')

    # print(mapToObj(list[0], attribs))
    objectList = [];
    for item in filter(lambda item: item, list):
        objectList.append(mapToObj(item, attribs))

    return objectList