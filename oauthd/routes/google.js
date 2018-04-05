const express = require('express')
const router = express.Router()
// const http = require('http');
const _ = require('underscore')
const cfg = require('../cfg')
const log = require('../lib/logger.js')
const axios = require('axios')

// import google libs
const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2
const googlePlus = google.plus('v1')

const oauth2Client = new OAuth2(
  cfg.google.CLIENT_ID,
  cfg.google.CLIENT_SECRET,
  cfg.google.REDIRECT_URL
)

const axiosClient = axios.create({
  baseURL: 'http://' + cfg.mankey.host + ':' + cfg.mankey.port + '/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
})

const scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'email'
];

/* http://localhost:3100/google/callback?code={authorizationCode} */
router.get('/callback', function(req, res) {
  let code = req.query.code
  let state = JSON.parse(req.query.state)
  log.info('get code=', {code:code, state: state})

  oauth2Client.getToken(code, function (token_err, tokens) {
    // tokens contains an access_token and an optional refresh_token.
    if (!token_err) {
      oauth2Client.setCredentials(tokens);
      // console.log('tokens=%j, type=%s', tokens, _.isObject(tokens))
      let token = tokens.access_token
      console.log('requesting google API access_token return, token=%s', token)

      googlePlus.people.get({
          userId: 'me',
          auth: oauth2Client
      }, function (plus_err, response) {
        if (!plus_err || _.isEmpty(plus_err)) {
          // console.log('google + API return, response=%j, type=%s', response.data, _.isObject(response.data))
          let profile = response.data
          // find value (xyz@gmail.com) from "emails":[{"value":"xyz@gmail.com","type":"account"}]
          let email = _.property('value')(_.first(profile.emails))
          let name = profile.displayName
          console.log('google plus API return, token=%s, email=%s, name=%s, app=%s', token, email, name, state.app)

          // TODO: POST to mankey service /auth/token/sync to sync token and
          // user in redis
          let data = {
            email: email,
            name: name,
            token: token,
            app: state.app
          }
          axiosClient.post('/auth/token/sync', data)
          .then((mankey_res) => {
            console.log(mankey_res.data);
            // redirect page to /profile?token={xxxx}&email=xxxx
            let url = 'http://localhost:8080/profile?token=' + token + '&email=' + email
            res.redirect(url)
          })
          .catch((mankey_err) => {
            console.log(mankey_err);
            return res.status(500).json('requesting mankey server error');
          });
        } else {
            console.log('error when requesting google plus API,err=%j', plus_err)
            // return 500 google plus access error
            return res.status(500).json('requesting google plus API error');
        }
      })
    } else {
      console.log('error when requesting google API access_token, err=%j', token_err)
      // return 500 google oauth access error
      return res.status(500).json('google oauth access error');
    }
  });
});

/* return a signin url
http://localhost:3100/google/signin?path={vue path name}
*/
router.get('/signin', function(req, res){
  let path = req.query.path
  let app = req.query.app
  console.log('call /sigin, path=%s, app=%s', path, app)
  let state = {
    path: path,
    app: app
  }

  let token_create_url = '/auth/token/create/' + app

  axiosClient.get(token_create_url)
  .then((token_create_res) => {
    console.log('token_create_res=%j',token_create_res.data.jwt_token);
  })
  .catch((token_create_err) => {
    console.log(token_create_err);
    return res.status(500).json('requesting mankey server error');
  });

  var url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
    // Optional property that passes state parameters to redirect URI
    // state must be string
    state: JSON.stringify(state)
  });
  return res.status(200).json(url);
});

module.exports = router;
