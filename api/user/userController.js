const axios = require('axios');
const mongoose = require('mongoose');
const responseHandler = require('../../lib/responseHandler');


// exports.testApi = (request, response) => {
// responseHandler.sendSuccess(response, {message: "Testing successfully"})
// }

exports.userSignup = (request, response) => {
    responseHandler.sendSuccess(response, {responceMessage: "Signup successfully"})
    }

exports.userLogin = (request, response) => {
        responseHandler.sendSuccess(response, {responceMessage: "Login successfully"})
  }   

  exports.userDetails = (request, response) => {
    responseHandler.sendSuccess(response, {responceMessage: "this is details"})
} 

exports.userEditProfile = (request, response) => {
    responseHandler.sendSuccess(response, {responceMessage: "this is edit profile"})
} 