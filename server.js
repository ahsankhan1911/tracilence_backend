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
// const ViModel = require('./api/model');
var PORT = process.env.PORT || 5000
const socketServer = require('./lib/socketIO/index')
// const Content = mongoose.model('Content');

mongoose.connect(`mongodb://localhost/tracilenceDB`, {
  useMongoClient: true
}, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("MongoDB is now Connected")
  }
});

mongoose.Promise = global.Promise;

console.log("NODE ENV >>>>>>>> ",process.env.NODE_ENV)

socketServer.server.listen(8000, () => {
console.log("Socket connected")

})

socketServer.io.on('connection', (socket) => {
  
 
  // socket.emit
  console.log("CONNECTION ESTABLISHEDD" , socket.id)

  socket.on('test', (message) => {

    console.log("Client message   ", message)
  })

})

//Disable x-powered-by response header for appilcation security purpose
app.disable('x-powered-by');



//serving static files according to environment
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'))
}
else {
  app.use(express.static('./client/public'))
}

//CORS congif
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

//body parser middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies


//API urls binded
require('./api')(app)


app.use(compression());




//REAL TIME ROUTE
app.get('/real-time', (req, res) => {
  var center = {
    lat: 59.95,
      lng: 30.33
  }
  
  setInterval(() => {
    center.lat+=0.001
    center.lng-=0.001
    socketServer.io.emit('test', center)

  },1000)

   res.send("REAL TIME ACTIVATED")

})

// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.send("Error: " + err.message);
// });

app.listen(PORT, function () {
  console.log('Running server on ' + PORT);
});
