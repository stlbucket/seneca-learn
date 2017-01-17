module.exports = function walkIn(options) {

  this.add('role:walkIn,cmd:removeFromWaitingList', function (msg, respond) {
    respond(null, {
      action: 'REMOVED FROM WAITING LIST',
      fullName: msg.firstName + ' ' + msg.lastName
    })
  })

  this.add('role:api,path:walkIn/removeFromWaitingList', function (msg, respond) {
    var firstName = msg.args.body.firstName
    var lastName  = msg.args.body.lastName

    this.act('role:walkIn,cmd:removeFromWaitingList', {
      firstName: firstName,
      lastName: lastName
    }, respond)
  })
}