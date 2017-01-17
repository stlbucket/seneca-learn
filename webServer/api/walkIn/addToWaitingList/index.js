const senecaAmqpTransport = require('seneca-amqp-transport');

module.exports = function walkIn(options) {

  this.add('role:api,path:walkIn/addToWaitingList', function (msg, respond) {
    var firstName = msg.args.body.firstName;
    var lastName  = msg.args.body.lastName;

    this
      .use(senecaAmqpTransport)
      .client({
        type: 'amqp',
        url: 'amqp://localhost:5672',
        pin: 'role:walkIn'
      })
      .act(`role:walkIn,cmd:addToWaitingList`,{
        firstName: firstName,
        lastName:lastName
      }, (err, result) => {
        if (err) {
          console.log('GOT AN ERROR', err);
          respond(null, {action: 'ERROR'})
        } else {
          console.log('GOT A RESULT', result);
          respond(null, result);
        }
      })
    // .act(`role:walkIn,cmd:addToWaitingList,firstName:${firstName},lastName:${lastName}`, (err, result) =>{
      //   if (err) {
      //     console.log('GOT AN ERROR', err);
      //     respond(null, {action: 'ERROR'})
      //   } else {
      //     console.log('GOT A RESULT', result);
      //     respond(null, result);
      //   }
      // })
  })

};


// module.exports = function walkIn(options) {
//
//   this.add('role:walkIn,cmd:addToWaitingList', function (msg, respond) {
//     respond(null, {
//       action: 'ADDED TO WAITING LIST',
//       fullName: msg.firstName + ' ' + msg.lastName
//     })
//   })
//
//   this.add('role:api,path:walkIn/addToWaitingList', function (msg, respond) {
//     var firstName = msg.args.body.firstName
//     var lastName  = msg.args.body.lastName
//
//     this.act('role:walkIn,cmd:addToWaitingList', {
//       firstName: firstName,
//       lastName: lastName,
//     }, respond)
//   })
//
// }