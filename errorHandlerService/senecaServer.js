'use strict'
var seneca = require('seneca');
const senecaAmqpTransport = require('seneca-amqp-transport');
const errorHandler = require('./errorHandler');

const transportType = 'amqp';
const transportUrl = 'amqp://localhost:5672';
const pin = 'role:vosError';

seneca()
  .use(senecaAmqpTransport)
  .use(errorHandler)
  .listen({
    type: transportType,
    url:  transportUrl,
    pin: pin
  });


