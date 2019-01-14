const server = require('http').createServer();

//Server Configuration
const io = require('socket.io')(server, {
  serveClient: true,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});



module.exports= {server,io}