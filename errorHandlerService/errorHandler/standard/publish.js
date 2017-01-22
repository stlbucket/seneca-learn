const endpointDefinition        = require('./definition');
const wrapEndpoint = require('../.././wrapEndpoint');

module.exports = function standard() {
  wrapEndpoint.bind(this)(endpointDefinition);
};