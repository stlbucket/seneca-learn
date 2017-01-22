
const senecaAmqpTransport = require('seneca-amqp-transport');

module.exports = function reportStandardError(options) {
  this.add('role:errHandler,cmd:reportStandardError', function (msg, respond) {
    console.log('TIME TO HANDLE THE ERROR');
    respond(null, {
      error: 'handled!'
    });
    // this
    //   .use(senecaAmqpTransport)
    //   .client({
    //     type: 'amqp',
    //     url: 'http://localhost:5672',
    //     pin: 'role:vosError'
    //   })
    //   .act(`role:vosError,cmd:standardError`, msg.args.body, respond)
  });
};