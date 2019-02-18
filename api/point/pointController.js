const axios = require('axios');
const mongoose = require('mongoose');
const responseHandler = require('../../lib/responseHandler');
const pointDoa = require('./pointDao')
const socketServer = require('../../lib/socketIO/index')


exports.receivePointLocation = (request, response) => {

    let {latitude, longitude} = request.query
    
    socketServer.io.emit('location', {latitude: latitude, longitude: longitude })

     return response.end()
}

exports.getNearestPoint = (request, response) => {

    let {latitude, longitude} = request.body

    
}