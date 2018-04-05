
const log = require('./logger.js')

module.exports = {
	/**
	 * Add Access-Control-Allow-Headers in HTTP response
	 */
	header : function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
    res.header('Content-Type', 'application/json; charset=utf-8');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		res.header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, DELETE, OPTIONS');
		next();

		//"Origin, X-Requested-With, Content-Type, Accept"
	},

	/**
	 * Authentication each /api/* request with the tokenid
	 */
	authentication: function(req, res, next) {
		const authentication = req.get('authorization');

		if(authentication) {
			const token = authentication.split(' ')[1];

			// got token, check if redis have this token, if not,
			// send it back to github to verify

			// if token exists, response request
			if(token && token=='ASJKLDDHLK'){
				log.info('in authentication() Bearer=' + token);
				next();
			} else {
				log.error('Authentication: bad token', {token:token});
			}
		} else {
			log.error('Authentication: Bearer not defined in request header');
		}

		res.status(200).json({message:'Unauthorized Access'});
	},
}
