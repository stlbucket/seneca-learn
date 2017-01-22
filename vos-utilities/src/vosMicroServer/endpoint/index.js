const ping = require('./ping');

function configureEndpoint(options){
  this.use(ping);
}

module.exports = configureEndpoint;