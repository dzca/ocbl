const assert = require("assert")
const redis = require("redis")
const bluebird = require("bluebird")
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)
const client = redis.createClient({password:'123456'})

describe('redis', function() {


  beforeEach(function(done) {
    //console.log('before each called');
    // if you'd like to select database 3, instead of 0 (default), call
    // client.select(3, function() { /* ... */ });

    client.onAsync('connect').then(function() {
      console.log('connected...');
    }).catch((err) => {
      console.log("error " + err);
    });

    done();
    // redisService.save(token_id, record, function(err, reply){
    //   console.log(reply.toString());
    //   done();
    // });

    //client.set('key', 'value!', );
  });

  afterEach(function(done){
    //console.log('after each called');
    client.quit();
    done();
  });

  describe('set value', function() {
      it('should be able to set value with time out', function(done) {
        console.log('set value called');
          // assert.equal(-1, [1,2,3].indexOf(5));
          // assert.equal(-1, [1,2,3].indexOf(0));
          let user = {name:"cathy", token:"AABBCC", role:"captain"};
          // expire in 120 seconds
          //client.setAsync('wx_access_token', 'AABBCC', 'EX',
          client.setAsync('cathy@abc.com', JSON.stringify(user), 'EX', 120)
          .then(function() {
            console.log('set value done');
          });

          client.getAsync('cathy@abc.com').then((res) => {
            user = JSON.parse(res)
            console.log('key=cathy@abc.com, v=%j', user);
            done();
          })
          .catch(function(error){
    				console.log('error where requesting access_token API = %s', error);
    				done();
    			});

// This will return a JavaScript String
// client.get("foo_rand000000000000", function (err, reply) {
//     console.log(reply.toString()); // Will print `OK`
// });


      });
  });
});
