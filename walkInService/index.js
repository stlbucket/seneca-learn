const endpointDefinitions = [
  require('./walkIn/claimWalkIn/definition')
];

module.exports = endpointDefinitions.map(
  endpointDefinition => {
    return {
      pin:  endpointDefinition.pin,
      schema: endpointDefinition.schema
    }
  }
);