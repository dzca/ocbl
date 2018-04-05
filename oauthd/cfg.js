'use strict';
const path = require('path');


const github_root= '/rest/github';

module.exports = {

  logging: {
    name: 'authd',
    streams : [ {
      level : 'debug',
      type : 'rotating-file',
      path : path.join('.', 'logs/server.log'),
      period : '14d', // daily rotation
      count : 3 // keep 3 back copies
    } ]
  },

  app:{
    api_url: '/api',
    port:3100,
    https_port: 4100,
    name:'oauthd',
    root:'.'
  },

  mankey:{
    host: 'mankey.demo.ca',
    port: 4100
  },

  github:{
    client_id: '1a30eaa741eb75611177',
    client_secret: 'd9b89bc2938c86b40afb61663dcf1b3576e1b1e2',
    scope: 'user',
    redirect_uri: 'http://guard.freeindex.ca/api/github/register',
  },

  google: {
    CLIENT_ID: '880282470989-dqq737l2npo94h1r4rf33sql57hnp9cj.apps.googleusercontent.com',
    CLIENT_SECRET: 'TrODsoNW1ZQnB5cKoMumEtpX',
    REDIRECT_URL: 'http://localhost:3100/google/callback'
  },

  code:{
    NOT_FOUND: 201,
    SUCCESS: 200,
    SYS_ERROR:	500,
  }
};
