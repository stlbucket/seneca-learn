
module.exports  = {
  addToWaitingList: require('./addToWaitingList'),
  removeFromWaitingList: require('./removeFromWaitingList'),
  claimWalkIn:  require('./claimWalkIn')
}

// const addToWaitingList = require('./addToWaitingList');
// const claimWalkIn = require('./claimWalkIn');
// const removeFromWaitingList = require('./removeFromWaitingList');
//
// module.exports = function api(options) {
//   this.add('init:api', function (msg, respond) {
//     this.act('role:web', {
//       routes: {
//         prefix: '/walkIn',
//         pin: 'role:api,path:*',
//         map: {
//           'addToWaitingList': {POST: true},
//           'removeFromWaitingList': {POST: true},
//           'claimWalkIn': {POST: true}
//         }
//       }
//     }, respond)
//   })
//
// }