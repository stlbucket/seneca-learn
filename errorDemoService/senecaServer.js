'use strict'
var seneca = require('seneca');
const senecaAmqpTransport = require('seneca-amqp-transport');
const errorDemo = require('./errorDemo');
const errorHandler = require('./reportStandardError');

const transportType = 'amqp';
const transportUrl = 'amqp://localhost:5672';
const pin = 'role:errorDemo';

seneca()
  .use(senecaAmqpTransport)
  .use(errorDemo)
  .use(errorHandler)
  .listen({
    type: transportType,
    url:  transportUrl,
    pin: pin
  });


