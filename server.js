var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs')
var app = express();
var stringsimilarity = require('string-similarity')

//You should load the file json first to save time
const csgoskin_data = JSON.parse(fs.readFileSync('./data/csgoskin.json'))
//Get all skin name in the array
const skinname_array = fs.readFileSync('./data/skinarray.txt', 'utf8').split(',')
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

var server = http.createServer(app);

app.get('/', (req, res) => {
    res.send("Home page. Server running okay.");
});

app.get('/getitem', (req, res) => {
    const skin_name = req.query.name;
    if (!skin_name) return res.send('Invalid')
    const match = stringsimilarity.findBestMatch(skin_name, skinname_array)
    let json_data = csgoskin_data.prices.filter(e => e.market_hash_name == match.bestMatch.target)
    json_data = json_data[0]
    res.send(JSON.stringify(json_data))

})

app.set('port', process.env.PORT || 5000);
app.set('ip', process.env.IP || "0.0.0.0");

server.listen(app.get('port'), app.get('ip'), function () {
    console.log("Your project is listening at %s:%d ", app.get('ip'), app.get('port'));
});