const executeHandler = require('../executeHandler/index');

function wrapEndpoint(endpointDefinition) {
  this.add(endpointDefinition.pin, endpointDefinition.handler);
  this.wrap(endpointDefinition.pin, function (msg, respond) {
    executeHandler(endpointDefinition, this.prior, msg, respond);
  });
};

module.exports = wrapEndpoint;