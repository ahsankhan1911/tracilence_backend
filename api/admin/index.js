var express = require('express');
const controller = require('./adminController');
const adminMiddleware = require('./adminMiddleware') 
const userMiddleware = require('../user/userMiddleware')

const adminRouter = express.Router();

adminRouter.route('/login').post([adminMiddleware.validateAdminLogin], controller.adminLogin)
// adminRouter.route('/point/list').get([adminMiddleware.authenticateAdminToken], controller.getPoints);
// adminRouter.route('/user/list').get([adminMiddleware.authenticateAdminToken], controller.getUsers)


module.exports = adminRouter