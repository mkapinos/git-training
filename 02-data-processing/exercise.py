import csv

codes = csv.load('../__data/kody.csv')

print('First record', codes[0]);
print(list(map(lambda item: item['city'], filter(lambda item: 'Miel' in item['city'], codes))))
print(set(map(lambda item: item['city'], filter(lambda item: 'Miel' in item['city'], codes))))

############## ARRAY #################

# get part of array


# pop


# delete form array


# add to array


# filtering


# maping


# reducing

# join

############## STRING #################

# to array


# split


# find in


# find pos of text


# replace


