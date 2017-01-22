const saveSecurityRole = require('./saveSecurityRole');

module.exports = function per(options) {
  this.use(saveSecurityRole);
};