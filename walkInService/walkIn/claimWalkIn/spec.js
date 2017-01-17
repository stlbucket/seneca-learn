const definition = require('./definition');

describe('claimWalkIn', function(){

  it('should be testable', function(done){
    const respond = (error, result) => {
      console.log('RESULT', result);
      done();
    };


    definition.handler({
      walkIn: {
        firstName:  'joe',
        lastName:   'schmoe'
      },
      ambassador: {
        firstName:  'tony',
        lastName:   'theTiger'
      }
    }, respond);
  })
});