const senecaAmqpTransport = require('seneca-amqp-transport');

module.exports = function permission(options) {

  this.add('role:permission,cmd:checkUserPermission', function (msg, respond) {
    respond(null, {
      result: 'PERMISSION GRANTED'
    })
  })

  this.add('role:api,path:permission/checkUserPermission', function (msg, respond) {
    // var firstName = msg.args.body.firstName
    // var lastName  = msg.args.body.lastName

    this.act('role:permission,cmd:checkUserPermission', {
    }, respond)

    // this
    //   .use(senecaAmqpTransport)
    //   .client({
    //     type: 'amqp',
    //     url: 'http://localhost:5672',
    //     pin: 'role:permission'
    //   })
    //   .act(`role:permission,cmd:checkUserPermission,firstName:${firstName},lastName:${lastName}`, respond)
  })

}