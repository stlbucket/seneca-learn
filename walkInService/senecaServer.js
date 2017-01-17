'use strict'
var seneca = require('seneca');
const senecaAmqpTransport = require('seneca-amqp-transport');
const walkIn = require('./walkIn');

const transportType = 'amqp';
const transportUrl = 'amqp://localhost:5672';
const pin = 'role:walkIn';

seneca()
  .use(senecaAmqpTransport)
  .use(walkIn)
  .listen({
    type: transportType,
    url:  transportUrl,
    pin: pin
  });


