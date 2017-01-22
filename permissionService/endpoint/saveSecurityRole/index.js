const wrapEndpoint = require('vos-utilities').vosMicroServiceEndpoint.wrapEndpoint;
const Promise        = require('bluebird');


function saveSecurityRole(msg, respond) {
  Promise.resolve()
    .then(() => {
      respond(null, {
        message: 'SECURITY ROLE SAVED',
        name: msg.name
      })
    })
    .catch(error => {
      respond(error);
    });
};

const endpointDefinition = {
  pin: 'role:permission,cmd:saveSecurityRole',
  handler: saveSecurityRole,
  schema: {
    "title": "role:permission,cmd:saveSecurityRole",
    "properties": {
      "name": {
        "type": "string"
      }
    },
    "required": ["name"]
  }
};

module.exports = function() {
  wrapEndpoint.bind(this)(endpointDefinition);
};