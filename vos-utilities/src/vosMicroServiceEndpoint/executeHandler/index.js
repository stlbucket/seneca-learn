const validateParams = require('../validateParams');

function executeHandler(endpointDefinition, prior, msg, respond) {
  const validationResult = validateParams(endpointDefinition, msg);

  if (validationResult === true) {
    prior(msg, (err, result) => {
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
}


module.exports = executeHandler;