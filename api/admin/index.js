var express = require('express');
const controller = require('./adminController');
const pointMiddleware = require('./adminMiddleware') 
const userMiddleware = require('../user/userMiddleware')

const pointRouter = express.Router();

pointRouter.route('/add').post([pointMiddleware.validateAddPoint], controller.addPoint)

pointRouter.route('/location').post( controller.receivePointLocation)
pointRouter.route('/get').get([userMiddleware.authenticateUserAccesstoken], controller.getNearestPoint)


module.exports = pointRouter