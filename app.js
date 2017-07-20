const express = require('express');
const logger = require('morgan');
const webpack = require('webpack');
const path = require('path');
const open = require('open');
const config = require('./webpack.config.js');
const bodyParser = require('body-parser');
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV !== 'development') {
  require('dotenv').load();
}

const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


require('./server/routes')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join( __dirname, './client/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    // console.log(err);
  } else {
    open(`http://0.0.0.0:${port}`);
  }
});

module.exports = app;

