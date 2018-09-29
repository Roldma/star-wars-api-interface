const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const apiController = require('./apiController');

const app = express();
const publicPath = path.resolve(__dirname, '../../public');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
app.use(express.static(publicPath));
/*
* static route that will always serve up bundle.js
*/
app.use('/scripts', express.static(path.resolve(__dirname, '../../dist/')));
app.use('/characters', express.static(path.resolve(__dirname, 'characters.json')));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(6969, () => {
  console.log(__dirname);
  console.log('Server listening on port 6969');
});
