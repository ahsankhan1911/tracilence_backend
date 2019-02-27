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
console.log("Tracilence app starting on",process.env.NODE_ENV, 'environment')
console.log()

console.log(process.env)
/**
 * MongoDB Config
 */

mongoose.set('debug', true);

mongoose.connect("mongodb://localhost:27017", {useMongoClient: true}, (err) => {

 if(err) {
   throw new Error(err)
 }
 else {
   console.log("Connected to MongoDB")
 }
});


mongoose.connection.on('disconnected', (message) =>{
      console.log("MongoDB is disconnected",message)
})

mongoose.connection.on('error', (err) =>{
      throw new Error(err.message)
});

mongoose.Promise = require('bluebird')

/**
 * MongoDB Config End
 */



/**
 * Socket.io 
 */
socketServer.server.listen(8000, () => {
console.log("Socket connected")

})

socketServer.io.on('connection', (socket) => {
  
  console.log("CONNECTION ESTABLISHEDD" , socket.id)

  socket.on('test', (message) => {

    console.log("Client message   ", message)
  })

})
/**
 * Socket.io 
 */

 

//Disable x-powered-by response header for appilcation security purpose
app.disable('x-powered-by');

//Compressing static resources
app.use(compression());


//Serving images always from public folder
app.use('/images',express.static('./client/public/images'))


//serving static files js/css only when environment is production otherwise will be dealed with Webpack-Dev-Server
// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static('./client/build'))
// }


//CORS congif
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "");
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


// app.post('/test', (req, res) => {
//   res.end()
// })

app.get('/', (req, res) => {
  res.send("WELCOME TO TRACILENCE APP")
})

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

app.listen(PORT,  () => {
  console.log('Running server on ' + PORT);
});
