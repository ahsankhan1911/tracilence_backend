const trackerRouter = require('./tracker')
const responseHandler = require('../lib/responseHandler')


module.exports = function(app){
	app.use('/api/tracker', trackerRouter);


	// Attach ErrorHandler to Handle All Errors
	app.use(responseHandler.handleError);
}