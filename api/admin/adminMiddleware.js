
const appUtils = require('../../lib/appUtils'),
_ = require('lodash'),
customException = require('../../lib/customException'),
constant = require('../../lib/constant'),
jwtHandler = require('../../lib/jwt');



var validateAdminLogin = function (request, response,next) {
			let {username, password} = request.body
			var errors = [];
			
			if(_.isEmpty(username)) {
				errors.push({fieldName:'username', message:"Please enter username"});
			}

			if(_.isEmpty(password)) {
				errors.push({fieldName:'password', message:"Please enter password"});
			}

			if(errors && errors.length > 0){
				validationError(errors, next);
			}
			next();

}


var authenticateAdminToken = function ( request, response,next) {
			let accessToken = request.get('x-access-token')
			
			jwtHandler.verifyAccessToken()
}


var validationError = function(errors, next){
if(errors && errors.length > 0){
  return next(customException.customErrorException(constant.MESSAGES.VALIDATION_ERROR, errors));
}
next();
}

module.exports = {
	validateAdminLogin
}