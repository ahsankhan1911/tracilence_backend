var express = require('express');
const controller = require('./pointController');
const pointMiddleware = require('./pointMiddleware') 
const userMiddleware = require('../user/userMiddleware')
const adminMiddleware = require('../admin/adminMiddleware')

const pointRouter = express.Router();

pointRouter.route('/add').post([pointMiddleware.validateAddPoint, adminMiddleware.authenticateAdminToken], controller.addPoint)

pointRouter.route('/location').get( controller.receivePointLocation)
pointRouter.route('/get').get([userMiddleware.authenticateUserAccesstoken], controller.getNearestPoint)


module.exports = pointRouter