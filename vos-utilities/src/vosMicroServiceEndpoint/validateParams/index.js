const Ajv = require('ajv');

function validateParams(endpointDefinition, msg) {
  const schema = endpointDefinition.schema;
  const pin = endpointDefinition.pin;
  const ajv   = new Ajv();
  const valid = ajv.validate(schema, msg);

  if (valid) {
    return valid;
  } else {
    return {
      error: 'INVALID PARAMS',
      pin:  pin,
      schema: schema,
      errors: ajv.errors,
      msg: msg
    }
  }
}


module.exports = validateParams;