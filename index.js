'use strict';
var path = require('path');
// Load .env file
require('dotenv').load({
  path: path.join(__dirname, './.env'),
  silent: true
});

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
const ViModel = require('./api/model');
var PORT = process.env.PORT || 5000
const Content = mongoose.model('Content');

mongoose.connect(`mongodb://localhost/vi-adminPanelDB`, {
  useMongoClient: true
}, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("MongoDB is now Connected")
  }
});

mongoose.Promise = global.Promise;

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, latitude, longitude, maxdistance");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});-



app.use(compression());

//body parser middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies



app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send("Error: " + err.message);
});



app.listen(PORT, function () {
  console.log('Running server on ' + PORT);
});
