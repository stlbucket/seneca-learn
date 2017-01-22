const Promise = require('bluebird');
const validateParams = require('vos-utilities').vosMicroServiceEndpoint.validateParams;

const schema = {
  "title": "role:walkIn,cmd:addToWaitingList",
  "properties": {
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
  },
  "required": ["firstName", "lastName"]
};

const pin = 'role:walkIn,cmd:addToWaitingList';

module.exports = function addToWaitingList(options) {

  this.add(pin, function (msg, respond) {
    Promise.resolve()
      .then(() => {
        throw new Error('WHA HAPPENED?');
        // respond(null, {
        //   action: 'ADDED TO WAITING LIST',
        //   fullName: msg.firstName + ' ' + msg.lastName
        // });
      })
      .catch(error => {
        respond(error);
      });

  });

  this.wrap(pin, function (msg, respond) {
    const validationResult = validateParams(schema, msg, pin);

    if (validationResult === true){
      this.prior(msg, (err, result) => {
        if (err) {
          respond(null, {
            error: err.toString(),
            stack: err.stack,
            msg: msg
          });
        } else {
          respond(null, result);
        }
      })
    } else {
      respond(null, validationResult);
    }

  })
};