module.exports = function walkIn(options) {

  this.add('role:walkIn,path:removeFromWaitingList', function (msg, respond) {
    respond(null, {
      action: 'REMOVED FROM WAITING LIST',
      fullName: msg.firstName + ' ' + msg.lastName
    })
  })

  this.add('role:api,path:walkIn/removeFromWaitingList', function (msg, respond) {
    var firstName = msgfirstName
    var lastName  = msglastName

    this.act('role:walkIn,path:removeFromWaitingList', {
      firstName: firstName,
      lastName: lastName
    }, respond)
  })
}