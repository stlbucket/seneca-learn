const senecaAmqpTransport = require('seneca-amqp-transport');

module.exports = function walkIn(options) {

  // this.add('role:walkIn,cmd:claimWalkIn', function (msg, respond) {
  //   respond(null, {
  //     action: 'CLAIMED FROM WAITING LIST',
  //     walkIn: msg.firstName + ' ' + msg.lastName,
  //     ambassador: msg.firstName + ' ' + msg.lastName
  //   })
  // })

  this.add('role:api,path:walkIn/claimWalkIn', function (msg, respond) {
    this
      .use(senecaAmqpTransport)
      .client({
        type: 'amqp',
        url: 'http://localhost:5672',
        pin: 'role:walkIn'
      })
      .act(`role:walkIn,cmd:claimWalkIn`, msg.args.body, respond)
  });

  // this.act('role:walkIn,cmd:claimWalkIn', {
  //     firstName: firstName,
  //     lastName: lastName,
  //     firstName: firstName,
  //     lastName: lastName
  //   }, respond)
  // })
}