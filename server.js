var port = process.env.PORT || 8080;

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var handler = require('./server/handler');

// Create app, and configure middleware
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(express.static(__dirname + '/client'));

// Routing
app.route('/save')
  .post(handler.createOrUpdate);

console.log('listening on port ', port);
app.listen(port);
