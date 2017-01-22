const wrapEndpoint = require('vos-utilities').vosMicroServiceEndpoint.wrapEndpoint;
const Promise        = require('bluebird');


function claimWalkIn(msg, respond) {
  // this is where the real work happens
  // usually a sequelize call (or other)
  // this Promise.resolve is curently explicit
  // most libs we call will return a promise
  // so this is just to demonstrate for now

  console.log('CLAIM WALKIN', msg);

  Promise.resolve()
    .then(() => {
      respond(null, {
        message: 'CLAIMED FROM WAITING LIST',
        walkIn: msg.walkIn.firstName + ' ' + msg.walkIn.lastName,
        ambassador: msg.ambassador.firstName + ' ' + msg.ambassador.lastName
      })
    })
    .catch(error => {
      respond(error);
    });
};

const endpointDefinition = {
  pin: 'role:walkIn,cmd:claimWalkIn',
  handler: claimWalkIn,
  schema: {
    "title": "role:walkIn,cmd:claimWalkIn",
    "properties": {
      "walkIn": {
        "properties": {
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          }
        }
      },
      "ambassador": {
        "properties": {
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          }
        }
      }
    },
    "required": ["walkIn", "ambassador"]
  }
};

module.exports = function claimWalkIn() {
  wrapEndpoint.bind(this)(endpointDefinition);
};