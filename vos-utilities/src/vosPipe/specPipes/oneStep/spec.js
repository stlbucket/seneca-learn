"use strict";
var uuid = require('node-uuid');
var vos = require('../../../../../Vos');
var should = require('should');

const oneStepPipe = require('./index');

describe(__filename, function() {
	
	it('one-step pipe', function (done) {
		const testId = uuid.v4();
		const user ={ login:	"who@cares.com" };
		const	params = {
			testId: testId,
			input:  "THIS IS VOS"
		};
		
		const pipe = oneStepPipe();
		
		pipe.execute({
			user:			user,
			params:		params,
			recordPipe:	true
		})
			.then(function(result) {
				// vos().clog('VOS WORKSPACE', pipe.ws, true);
				result.testId.should.equal(testId);
				done();
			});
		
	});


});