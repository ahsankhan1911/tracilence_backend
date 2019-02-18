var express = require('express');
const controller = require('./pointController');
const pointMiddleware = require('./pointMiddleware') 
const userMiddleware = require('../user/userMiddleware')
var multer = require('multer');

const pointRouter = express.Router();


pointRouter.route('/location').post( controller.receivePointLocation)
pointRouter.route('/get').get([userMiddleware.authenticateUserAccesstoken], controller.getNearestPoint)


module.exports = pointRouter