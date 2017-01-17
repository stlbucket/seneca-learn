const Promise        = require('bluebird');

function handleError(msg, respond){
  // this is where the real work happens
  // usually a sequelize call (or other)

  Promise.resolve()
    .then(() => {
      console.log('LOGGING ERROR', msg);
      respond(null, {result: 'ERROR HANDLED'});
    })
    .catch(error => {
      respond(error);
    });
};

module.exports = {
  pin: 'role:vosError,cmd:standardError',
  schema: {
    "title": "role:vosError,cmd:standardError",
    "properties": {
      "message": {
        "type": "string"
      },
    },
    "required": ["message"]
  },
  handler: handleError
};