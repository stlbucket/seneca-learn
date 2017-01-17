const endpointDefinition        = require('./definition');
const wrapEndpoint = require('../../../vos-utilities/wrapEndpoint');

module.exports = function standard() {
  wrapEndpoint.bind(this)(endpointDefinition);
};