#!/usr/bin/env node

// =======================
// package import
// =======================
const express     = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

const cfg = require('./cfg');
const log = require('./lib/logger.js')

// =======================
// web server configuration
// =======================
app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }));
// app.use(bodyParser.json({ limit: '1mb' }));

app.use(cookieParser());
app.use(favicon(__dirname + '/app/assets/favicon.ico'));

//====================================================
// middelware - must be loaded first
//====================================================
const midware = require('./lib/midware')
app.all('*', midware.header);
//=======================
//routes
//=======================
const auth = require('./routes/auth');
const google = require('./routes/google');
app.use(cfg.app.api_url, auth);
app.use('/google', google);
//=======================
//catch 404 and forward to error handler
//=======================

app.use(function(req, res) {
	//res.status(404).send('404: Page not Found');
	res.status(404).json({
		message : '404: Page not Found'
	});
});

app.use(function(error, req, res, next) {
	// res.status(500).send('500: Internal Server Error %j', error);
	res.status(500).json({
		message : '500: Internal Server Error',
		error: error
	});
});

app.listen(cfg.app.port, function(){
  console.log('server listening on port ' + cfg.app.port);
	log.info('server listening on port ' + cfg.app.port);
});
