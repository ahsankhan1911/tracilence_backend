
const appUtils = require('../../lib/appUtils'),
      _ = require('lodash'),
      userDao = require('./userDao'),
      customException = require('../../lib/customException')
      constant = require('../../lib/constant')

var validateSignUp = function(request, response, next){
	let {name, email, password} = request.body;
	var errors = [];

	userDao.checkIfEmailExist({email}).then((result) => {
		if(result) {
			errors.push({fieldName:'email', message:"A user already exist with this email"});
		}
	}).catch((error) => {
		throw error
	})

	if(_.isEmpty(name)){
		errors.push({fieldName:'name', message:"Please enter your name"});
	}
	email = _.toLower(email);
	if(_.isEmpty(email)){
		errors.push({fieldName:'email', message:"Please enter your email"});
	}
	if(!appUtils.isValidEmail(email)){
		errors.push({fieldName:'email', message:"Please provide a valid email"});
    }
	if(_.isEmpty(password)){
		errors.push({fieldName:'password', message:"Please enter your password"});
	}
	
	if(errors && errors.length > 0){
		validationError(errors, next);
	}
	next();
}

var authenticateUserAccesstoken = (request, response,next) => {
   let {accessToken} = request.query
   userDao.authenticateUserAccesstoken({accessToken}).then((result) => {
	   if(result) {
		   next()
	   }

	else {
		return next(customException.customErrorException(constant.MESSAGES.ACCESS_FORBIDDEN, null));
	   }
   })
   
}


var validationError = function(errors, next){
	if(errors && errors.length > 0){
		return next(customException.customErrorException(constant.MESSAGES.VALIDATION_ERROR, errors));
	}
	next();
}

module.exports = {
	validateSignUp,
	authenticateUserAccesstoken
}