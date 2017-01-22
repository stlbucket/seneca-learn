'use strict'
// const seneca = require('seneca');
// const senecaAmqpTransport = require('seneca-amqp-transport');
const config = require('./config');

const vosMicroServer = require('vos-utilities').vosMicroServer;
const permissionEndpoint = require('./endpoint');

const transportType = config.transportType;
const transportUrl = config.transportUrl;
const servicePin = config.servicePin;

console.log(transportUrl, transportType, servicePin, config.extraKey);

// seneca()
//   .use(senecaAmqpTransport)
//   .use(vosMicroServer.endpoint)
//   .use(permissionEndpoint)
//   .listen({
//     type: transportType,
//     url:  transportUrl,
//     pin: servicePin
//   });



const server = vosMicroServer.senecaServer(permissionEndpoint, config);


server.listen({
  type: transportType,
  url: transportUrl,
  pin: servicePin
});