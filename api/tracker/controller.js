const axios = require('axios');
const mongoose = require('mongoose');
const responseHandler = require('../../lib/responseHandler');


exports.testApi = (request, response) => {
responseHandler.sendSuccess(response, {message: "Testing successfully"})
}