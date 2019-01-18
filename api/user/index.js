var express = require('express');
var controller = require('./userController');
// var multer = require('multer');

const trackerRouter = express.Router();


trackerRouter.route('/signup').post(controller.userSignup)
trackerRouter.route('/login').post(controller.userLogin)
trackerRouter.route('/details/:_id').post(controller.userDetails)
trackerRouter.route('/edit-profile/:_id').post(controller.userEditProfile)



module.exports = trackerRouter