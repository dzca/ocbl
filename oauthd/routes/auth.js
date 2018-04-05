const express = require('express')
const router = express.Router()
const http = require('http');
const _ = require('underscore')


const cfg = require('../cfg')
const log = require('../lib/logger.js')

/* POST /api/access_token?code=xyz */
router.post('/access_token', function(req, res) {
  let code = req.query.code
  log.info('get /access_token', {code:code})
  let tokens = {}
  tokens['xya'] = 'AABBCC'
  tokens['xyb'] = 'AABBCD'
  tokens['xyc'] = 'AABBCE'
  tokens['xye'] = 'AABBCF'
  tokens['xyf'] = 'AABBCG'


  let token = _.property(code)(tokens);
  return res.status(200).json({access_token:token});
  // res.status(200).send('access_token=' + token + '&token_type=bearer')
});

/* /api/user?access_token=AABBCC */
router.get('/user', function(req, res) {
  let token = req.query.access_token
  log.info('get /access_token', {token:token})
  let users = {}
  users['AABBCC'] = {'email': 'dustin@abc.ca'}
  users['AABBCD'] = {'email': 'luke@abc.ca'}
  users['AABBCE'] = {'email': 'lana@abc.ca'}
  users['AABBCF'] = {'email': 'anna@abc.ca'}
  users['AABBCG'] = {'email': 'martin@abc.ca'}

  let user = _.property(token)(users);
  return res.status(200).json(user);
});

/**
 * call back
 * HTTP GET (mock-web)
 * https://localhost:4002/api/github/callback?code=xyz
 */
router.get('/login/:code', function(req, res){
  let code = req.params.code
  log.info('login called.', {code: code})

  http.get('http://api.skyler.ca/auth/rest/github/callback?code=' + code, (res) => {
    console.log('statusCode:', res.statusCode)
    console.log('headers:', res.headers)

    res.on('data', (d) => {
      process.stdout.write(d)
      // log.info('login success and getting data.', {data: d})
    });
  }).on('error', (e) => {
    log.error('error when calling http://api.skyler.ca/auth/rest/github/callback', {err: e})
    console.error(e)
  });
  // return res.status(200).json('OK');
});

module.exports = router;
