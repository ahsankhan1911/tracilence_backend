
const appUtils = require('../../lib/appUtils'),
_ = require('lodash'),
customException = require('../../lib/customException'),
constant = require('../../lib/constant'),
Exception = require('../../lib/api-model/Exception')
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
			
			if(accessToken) {
				jwtHandler.verifyAccessToken(accessToken).then((result) => {
						request.user =  result.payload
						next()
					 
				})
				.catch((err) => {
                    switch(err.message) {
						    case "jwt expired":
						    response.status(401)
						    return next(new Exception(2, constant.MESSAGES.UNAUTHORIZED_ACCESS));
				  
						    case "invalid token": 
						    response.status(403)
							  return	next(new Exception(3, constant.MESSAGES.ACCESS_FORBIDDEN));
							
							case "invalid signature": 
							response.status(403)
								return	next(new Exception(3, constant.MESSAGES.ACCESS_FORBIDDEN));
				  
							default:
							response.status(400)
						     return	next( new Exception(4, constant.MESSAGES.SOMETHING_WENT_WRONG));
					     }
				})
			}
			else {
				response.status(401)
				return next( new Exception(1, "No Access Token Provided !") );
			}
			
}


var validationError = function(errors, next){
if(errors && errors.length > 0){
  return next(customException.customErrorException(constant.MESSAGES.VALIDATION_ERROR, errors));
}
next();
}

module.exports = {
	validateAdminLogin,
	authenticateAdminToken
}