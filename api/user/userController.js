const axios = require('axios');
const mongoose = require('mongoose');
const responseHandler = require('../../lib/responseHandler');
const userDoa = require('./userDao')



// exports.testApi = (request, response) => {
// responseHandler.sendSuccess(response, {message: "Testing successfully"})
// }


exports.userSignup = (request, response) => {
    let { name, email, password } = request.body

    userDoa.createUser({name ,email ,password}).then((result) => {
        responseHandler.sendSuccess(response, { responceMessage: "Signup successfully", userId: result._id , accessToken: result.accessToken})
    }).catch((error) => {

        responseHandler.sendError(response, error)
    })

}



exports.userLogin = (request, response) => {
    let {email, password} = request.body
    userDoa.userLogin({email, password}).then((result) => {
        responseHandler.sendSuccess(response, {responceMessage: "Login successfully", userId: result.user._id , accessToken: result.accessToken})

    }).catch((error) => {
        responseHandler.sendError(response, error)
    })
       
  }   

  exports.userDetails = (request, response) => {
    responseHandler.sendSuccess(response, {responceMessage: "this is details"})
} 

exports.userEditProfile = (request, response) => {
    responseHandler.sendSuccess(response, {responceMessage: "this is edit profile"})
} 