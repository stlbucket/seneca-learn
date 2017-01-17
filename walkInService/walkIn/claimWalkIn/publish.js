const endpointDefinition        = require('./definition');
const wrapEndpoint = require('../../../vos-utilities/wrapEndpoint');

module.exports = function claimWalkIn() {
  wrapEndpoint.bind(this)(endpointDefinition);
};