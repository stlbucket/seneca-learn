const throwError = require('./throwError');

module.exports = function errorDemoServices(options) {
  this.use(throwError);
};