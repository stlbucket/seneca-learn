const wrapEndpoint = require('../../../vosMicroServiceEndpoint/wrapEndpoint');
const Promise        = require('bluebird');
const config = require('../../config');

const role = config.serviceName;
const cmd = 'ping';
const pin = `role:${role},cmd:${cmd}`;

function ping(msg, respond) {
  Promise.resolve()
    .then(() => {
      respond(null, {
        message: 'PING',
        name: msg.payload
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
  wrapEndpoint.bind(this)(endpointDefinition);
};

module.exports = handler;


// const wrapEndpoint = require('../../../vosMicroServiceEndpoint/wrapEndpoint');
// const Promise        = require('bluebird');
//
// function ping(msg, respond) {
//   Promise.resolve()
//     .then(() => {
//       respond(null, {
//         message: 'PING',
//         name: msg.payload
//       })
//     })
//     .catch(error => {
//       respond(error);
//     });
// };
//
// const endpointDefinition = {
//   pin: 'role:vos,cmd:ping',
//   handler: ping,
//   schema: {
//     "title": "role:vos,cmd:ping",
//     "properties": {
//       "payload": {
//         "type": "string"
//       }
//     },
//     "required": ["payload"]
//   }
// };
//
// module.exports = function () {
//   wrapEndpoint.bind(this)(endpointDefinition);
// };

























