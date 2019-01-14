var express = require('express');
var controller = require('./controller');
// var multer = require('multer');

const trackerRouter = express.Router();


trackerRouter.route('/test').get(controller.testApi)

module.exports = trackerRouter