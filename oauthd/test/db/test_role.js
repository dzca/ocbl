const models = require('../../models');
const log = require('../../lib/logger.js')
const Promise = require("bluebird");

exports.addUserRoleTest = function(test){
  const user = models.User.findOne({username: 'dustin'});
  const role = models.Role.findOne({name: 'captain'});

  const joinGroup = Promise.all([user, role]);

  joinGroup.then(([resUser,resRole]) => {
    resUser.setRoles([resRole]);
    return resUser.save();
    //return resUser.update({ roles: [resRole]});
  })
  .then((res) => {
    console.log('saved user ' + res.username);
    //console.dir(res);
  })
  .catch(err => console.error(err));
  test.done();
};
