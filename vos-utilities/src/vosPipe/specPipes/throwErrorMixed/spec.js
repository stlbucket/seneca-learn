"use strict";
var uuid = require('node-uuid');
var vos = require('../../../../../Vos');
var should = require('should');

const throwErrorMixedPipe = require('./index');

describe(__filename, function() {
	
	it('throw error mixed pipe', function (done) {
		const testId = uuid.v4();
		const user ={ login:	"who@cares.com" };
		const	params = {
			testId: testId,
			input:  "THIS IS VOS"
		};
		
		throwErrorMixedPipe({
			user:			user,
			params:		params,
			recordPipe:	true
		})
			.then(function(result) {
				done(result);
			})
			.catch((expectAnError)=>{
				// vos().clog('THROW ERROR MIXED PIPE EXPECTED AN ERROR', expectAnError, true);
				expectAnError.name.indexOf('Vos').should.equal(0);
				done();
			});
		
	});


});