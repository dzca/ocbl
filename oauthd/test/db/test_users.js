const models = require('../../models');
const log = require('../../lib/logger.js')

// const assert = require("assert");
describe('db', function() {
  describe('test user table', function() {
    it('should be able to connect db', function(done) {
      models.sequelize.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      })
      .finally(() => {
        models.sequelize.close()
        done();
      });
    });

    it('should be able to query user', function(done) {
      models.sequelize.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
        done();
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
        done();
      });
    });

  });
});
