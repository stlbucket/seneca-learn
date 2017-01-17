const Promise        = require('bluebird');
const executeHandler = require('../../../vos-utilities/executeHandler');

const endpointDefinition = {
  pin: 'role:errorDemo,cmd:throwError',
  schema: {
    "title": "role:errorDemo,cmd:throwError",
    "properties": {
      "errorTag": {
        "type": "string"
      },
    },
    "required": ["errorTag"]
  },
  handler: (msg, respond) => {
    // this is where the real work happens
    // usually a sequelize call (or other)

    Promise.resolve()
      .then(() => {
        throw new Error(`WHA HAPPENED? ------ ${msg.errorTag}`);
      })
      .catch(error => {
        respond(error);
      });
  }
};

module.exports = function throwErrorEndpoint() {
  this.add(endpointDefinition.pin, endpointDefinition.handler);
  this.wrap(endpointDefinition.pin, function (msg, respond) {
    executeHandler(endpointDefinition, this.prior, msg, respond);
  });
};