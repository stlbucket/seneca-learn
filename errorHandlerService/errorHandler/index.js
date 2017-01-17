const standard = require('./standard');

module.exports = function errorDemoServices(options) {
  this.use(standard.publish);
};