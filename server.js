var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);
app.use(express.static(path.join(__dirname, './')));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// Handle poke requests
app.get('/poke', (req, res, next) => {
  var pokemon = [];
  pokemon.push({
    num: "001",
    name: "Bulbasaur"
  });

  res.json(pokemon);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(3001, () => {
  console.log('Example app listening on 3001');
});