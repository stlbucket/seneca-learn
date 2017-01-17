const senecaAmqpTransport = require('seneca-amqp-transport');
const R = require('ramda');
const util = require('util');

module.exports = function walkIn(options) {
  this.add('role:api,path:errorDemo/throwError/:errorTag', function (msg, respond) {
    console.log('HERE WE GO', msg.args.params);

    this
      .use(senecaAmqpTransport)
      .client({
        type: 'amqp',
        url: 'amqp://localhost:5672',
        pin: 'role:errorDemo'
      })
      .act(`role:errorDemo,cmd:throwError`, msg.args.params, respond)
  });

}