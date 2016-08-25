var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);
app.use('/client', express.static('client'));
app.use('/node_modules', express.static('node_modules'));
app.use('/server', express.static('server'));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// Handle poke requests
app.get('/poke', (req, res, next) => {
  var pokemon = require('./server/list');
  res.json(pokemon);
  next();
});

// Get a Poke's location data
app.get('/poke/:num', (req, res, next) => {
  var num = req.params.num;
  var data = require(path.join(__dirname, '/server', '/data/' + num + '.json'));
  data.details = require(path.join(__dirname, '/server', '/data/details/' + num + '.json'));
  res.json(data);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client', 'index.html'));
});

app.listen(3001, () => {
  console.log('Example app listening on 3001');
});