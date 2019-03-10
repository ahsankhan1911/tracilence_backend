const axios = require('axios');
const mongoose = require('mongoose');
const responseHandler = require('../../lib/responseHandler');
const adminDoa = require('./adminDao.js')
const socketServer = require('../../lib/socketIO/index')


exports.adminLogin = (request, response) => {
    let {username, password} = request.body;

   adminDoa.adminLogin({username, password} ).then((result) => {
    responseHandler.sendSuccess(response, {responceMessage: "Successfully logged In", accessToken: result.accessToken})

}).catch((error) => {
    responseHandler.sendError(response, error)
})
   
}