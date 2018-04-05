const express = require('express')
const router = express.Router()
const http = require('http');
const _ = require('underscore')
const redis = require('../lib/cache')
const cfg = require('../cfg')
const log = require('../lib/logger.js')

const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2

const gmail = google.gmail('v1')

const oauth2Client = new OAuth2(
  cfg.google.CLIENT_ID,
  cfg.google.CLIENT_SECRET,
  cfg.google.REDIRECT_URL
);

const scopes = [
  //'https://www.googleapis.com/auth/gmail.readonly'
  'email'
];

// the auth redis will be:
// key = email
// value = user(token, status, role)

/* http://localhost:3100/google/callback?code={authorizationCode} */
router.get('/callback', function(req, res) {
  let code = req.query.code
  log.info('get code=', {code:code})

  oauth2Client.getToken(code, function (err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    if (!err) {
      oauth2Client.setCredentials(tokens);
      // console.log('tokens=%j, type=%s', tokens, _.isObject(tokens))
      let token = tokens.access_token
      console.log('token=%s', token)

      gmail.users.labels.list({
        auth: oauth2Client,
        userId: 'me',
      }, function(err2, response) {
         if (err2) {
           console.log('The API returned an error: ' + err2);
           return res.status(200).json('gmail api error');
         }

         console.log('google + API return, response=%j, type=%s', response.data, _.isObject(response.data))

         var labels = response.labels;

         if (labels.length == 0) {
           console.log('No labels found.');
         } else {
           console.log('Labels:');
           for (var i = 0; i < labels.length; i++) {
             var label = labels[i];
             console.log('- %s', label.name);
           }
         }
       });

    } else {
      console.log('err=%j', err)
      // return 500 google oauth access error
    }
  });
  // redirect page to /profile?token={xxxx} and save token in localstorage
  // vue app use token to fetch user profile and request apis
  return res.status(200).json(code);
});

/* return a signin url
http://localhost:3100/google/signin?path={vue path name}
*/
router.get('/signin', function(req, res){
  let path = req.query.path
  var url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
    // Optional property that passes state parameters to redirect URI
    state: { path: path }
  });
  return res.status(200).json(url);
});

module.exports = router;
