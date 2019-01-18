const trackerRouter = require('./tracker')
const responseHandler = require('../lib/responseHandler')
const userRouter = require('./user')


module.exports = function(app){
	app.use('/api/tracker', trackerRouter);
	app.use('/api/user', userRouter);

	// Attach ErrorHandler to Handle All Errors
	app.use(responseHandler.handleError);
}