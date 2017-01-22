require('dotenv-safe').load({
  allowEmptyValues: false
});

const config = require('vos-utilities').vosMicroServer.config({
  extraKey: 'EXTRA VALUE'
});

module.exports = config;