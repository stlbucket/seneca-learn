const vosMicroServiceEndpoint = require('../../../vosMicroServiceEndpoint');
const Promise        = require('bluebird');
const config = require('../../config')();

const role = config.serviceName;
const cmd = 'ping';
const pin = `role:${role},cmd:${cmd}`;

function ping(msg, respond) {
  Promise.resolve()
    .then(() => {
      respond(null, {
        message: `PING: ${role}`,
        payload: msg.payload
      })
    })
    .catch(error => {
      respond(error);
    });
};

const endpointDefinition = {
  pin: pin,
  handler: ping,
  schema: {
    "title": pin,
    "properties": {
      "payload": {
        "type": "string"
      }
    },
    "required": ["payload"]
  }
};

function handler(){
  vosMicroServiceEndpoint.bind(this)(endpointDefinition);
};

module.exports = handler;