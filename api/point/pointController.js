const axios = require('axios');
const mongoose = require('mongoose');
const responseHandler = require('../../lib/responseHandler');
const pointDoa = require('./pointDao.js')
const socketServer = require('../../lib/socketIO/index')


exports.addPoint = (request, response) => {
    let {pointName, pointNumberPlate, latitude , longitude} = request.body;

   pointDoa.addPoint({pointName, pointNumberPlate, latitude , longitude} ).then((result) => {
    responseHandler.sendSuccess(response, {responceMessage: "Point Added successfully", pointId: result._id})

}).catch((error) => {
    responseHandler.sendError(response, error)
})
   
}


exports.receivePointLocation = (request, response) => {

    let {latitude, longitude} = request.query
    
    socketServer.io.emit('location', {latitude: latitude, longitude: longitude })

     return response.end()
}

exports.getNearestPoint = (request, response) => {

    let {latitude, longitude} = request.body
   pointDoa.getNearestPoint(latitude, longitude)

}