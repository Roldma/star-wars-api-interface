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

app.get('*', (req, res) => {
  res.sendfile(path.join(publicPath, 'index.html'));
});

app.listen(6969, () => {
  console.log('Server listening on port 6969');
});
