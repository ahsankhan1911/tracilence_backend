const responseHandler = require('../lib/responseHandler')
const userRouter = require('./user')
const pointRouter = require('./point')



module.exports = function(app){
	app.use('/api/user', userRouter);
	app.use('/api/point', pointRouter);


	// Attach ErrorHandler to Handle All Errors
	app.use(responseHandler.handleError);
}