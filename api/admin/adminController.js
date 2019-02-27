const axios = require('axios');
const mongoose = require('mongoose');
const responseHandler = require('../../lib/responseHandler');
const adminDoa = require('./adminDao.js')
const socketServer = require('../../lib/socketIO/index')


exports.addadmin = (request, response) => {
    let {} = request.body;
    


   adminDoa.addadmin({adminName, adminNumberPlate,adminLocation} ).then((result) => {
    responseHandler.sendSuccess(response, {responceMessage: "admin Added successfully", adminId: result._id})

}).catch((error) => {
    responseHandler.sendError(response, error)
})
   
}