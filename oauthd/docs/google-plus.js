const express = require('express')
const router = express.Router()
const http = require('http');
const _ = require('underscore')
const redis = require('../lib/cache')
const cfg = require('../cfg')
const log = require('../lib/logger.js')

const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2

const googlePlus = google.plus('v1')

const oauth2Client = new OAuth2(
  cfg.google.CLIENT_ID,
  cfg.google.CLIENT_SECRET,
  cfg.google.REDIRECT_URL
);

const scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'profile',
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

      // TODO: fetch token:
      googlePlus.people.get({
          userId: 'me',
          auth: oauth2Client
      }, function (err2, response) {
        if (!err2 || _.isEmpty(err2)) {
          console.log('google + API return, response=%j, type=%s', response.data, _.isObject(response.data))
          let profile = response.data
          // find value (xyz@gmail.com) from "emails":[{"value":"xyz@gmail.com","type":"account"}]
          let email = _.property('value')(_.first(profile.emails))
          console.log('google + API return, token=%s', token)

          console.log('email=%j', email)
          // TODO: fetch email, if in redis, resfresh expire time, replace token
          // TODO: find user email and update redis server with token -> (user)
          redis.EXISTSAsync(email).then((result) => {
            console.log('email %s exists=%s', email, result)
            if(!result){
              // create user object and save into redis
              let user = {token:token, status:"v"};
              return client.setAsync('cathy@abc.com', JSON.stringify(user), 'EX', 120)
            } else {
              // have user, return to client page with user object
            }
          })
          .then(function() {
            // add visitor into redis, redirect to profile(visitor) page
            console.log('set user done');

          })
          .catch((err3) => {
            console.log('error checking key in redis = %s', err3);
            // return redis access error
          })
          // redis.getAsync(email).then((get_token_res) => {
          //   console.log('wx_access_token=%s', res);
          //   done();
          // })
          // .catch(function(error){
    			// 	console.log('error where requesting access_token API = %s', error);
    			// 	done();
    			// });
          //
          //
          // redis.setAsync('wx_access_token', 'AABBCC', 'EX', 120).then(function() {
          //   console.log('set value done');
          //
          // });


        } else {
            console.log('err2=%j', err2)
            // return 500 google plus access error
        }
      })
    } else {
      console.log('err=%j', err)
      // return 500 google oauth access error
    }
  });
  // redirect page to /profile?token={xxxx} and save token in localstorage
  // vue app use token to fetch user profile and request apis
  // return res.status(200).json(code);
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
