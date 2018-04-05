'use strict';

const expect = require('expect.js');
const models = require('../../models');
const Promise = require("bluebird");

describe('models/user', function () {
  before(function () {
    // sync db schema
    models.sequelize.sync().then(() => {
      console.log('Database has been synced successfully.');
    })
    .catch(err => {
      console.error('Unable to sync the database:', err);
    }).finally(() => {
      console.log('...before...')
      models.sequelize.close()
    });

    // models.User.create({
    //   username: 'dustin',
    //   email: 'dustin@abc.ca'
    // })
    //
    // models.Role.create({
    //   name: 'captain'
    // })
  });

  // after(() => {
  //   console.log('remove user and role in after...')
  //   //
  //   // models.Role.destroy({
  // 	//   where: {
  // 	//     name: 'captain'
  // 	//   }
  // 	// })
  //   //
  //   // models.User.destroy({
  // 	//   where: {
  // 	//     username: 'dustin'
  // 	//   }
  // 	// })
  // })

  // beforeEach(function () {
  //   this.User = require('../../models').User;
  //   this.Role = require('../../models').Role;
  // });


  describe('create', function () {
    it('creates a join with user and role', function (done) {
      const user = models.User.findOne({username: 'dustin'});
      const role = models.Role.findOne({name: 'captain'});

      const joinGroup = Promise.all([user, role]);

      joinGroup.then(([resUser,resRole]) => {
        resUser.setRoles([resRole]);
        return resUser.save();
        //return resUser.update({ roles: [resRole]});
      })
      .then((res) => {
        console.log('saved user and role ' + res.username)
        console.log(res.toJSON());
        res.setRoles([])
        return res.save()
      })
      .then((saved) => { done() })
      .catch(err => console.error(err))
      .finally(() => {
        console.log('...done...')
        // models.sequelize.close()
      });

// .bind(this)
      // .then((user) => {
      //   return this.Role.create({ name: 'captain', user_id: user.id })
      // })
      // .then((role) => {
      //   expect(role.name).to.equal('captain')
      // })
      // .finally(() => {
      //   done()
      // });
    }); // end it
  });
});
