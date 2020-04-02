// You have to run this locally (dont need to run it usually, when update new skin name on bitskins, you should run this (about 4 sec running))
const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data/csgoskin.json'))
const array = []

data.prices.forEach(element => {
    array.push(element.market_hash_name)
});
fs.writeFileSync('./data/skinarray.txt', array)