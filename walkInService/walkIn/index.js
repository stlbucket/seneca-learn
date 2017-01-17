const addToWaitingList = require('./addToWaitingList');
const claimWalkIn = require('./claimWalkIn');

module.exports = function walkInServices(options) {

  this.use(addToWaitingList);
  this.use(claimWalkIn.publish);
  // this.use(walkIn.removeFromWaitingList);
};