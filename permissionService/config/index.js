require('dotenv-safe').load({
  allowEmptyValues: false
});

module.exports = require('vos-utilities').vosMicroServer.config({
  extraKey: 'EXTRA VALUE'
});