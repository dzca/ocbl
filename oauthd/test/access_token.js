const assert = require('assert');

const cfg = require('../cfg');

describe('wechat api', function() {
	
	// GET
	// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx4cba7d9347fb4cbe&secret=6cd4803883e649fda1074b392a9102bd
    describe('access_token API', function() {
        it('should return access token', function(done) {
			const axios = require('axios');
			axios.get('https://api.weixin.qq.com/cgi-bin/token',{
				params:{
					grant_type : 'client_credential',
					appid : cfg.wechat.appid,
					secret : cfg.wechat.app_secret
				}
			})
			.then(function(res){
				console.log('access_token=%s',res.data.access_token);
				console.log('expires_in=%s',res.data.expires_in);
				done();
			})
			.catch(function(error){
				console.log('error where requesting access_token API = %s', error);
				done();
			});
        });
    });
});
