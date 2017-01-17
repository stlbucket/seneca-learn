const errorDemo = require('./errorDemo');
const walkIn = require('./walkIn');
const permission = require('./permission');

module.exports = function api(options) {
  this.use(errorDemo.throwError);

  this.use(walkIn.addToWaitingList);
  this.use(walkIn.claimWalkIn);
  this.use(walkIn.removeFromWaitingList);

  this.use(permission.checkUserPermission);

  this.add('init:api', function (msg, respond) {
    this.act('role:web', {
      routes: {
        prefix: '/api',
        pin: 'role:api,path:*',
        map: {
          'errorDemo/throwError/:errorTag': {GET: true},

          'walkIn/addToWaitingList': {POST: true},
          'walkIn/removeFromWaitingList': {POST: true},
          'walkIn/claimWalkIn': {POST: true},

          'permission/checkUserPermission': {POST: true}
        }
      }
    }, respond)
  })

}