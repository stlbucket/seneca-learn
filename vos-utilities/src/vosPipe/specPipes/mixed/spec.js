"use strict";
var uuid = require('node-uuid');
var vos = require('../../../../../Vos');
var should = require('should');

const mixedPipe = require('./index');

describe(__filename, function() {
	
	it('mixed pipe', function (done) {
		this.timeout(5000);
		
		const testId = uuid.v4();
		const user ={ login:	"who@cares.com" };
		const	params = {
			testId: testId,
			input:  "THIS IS VOS",
			stockSymbol:	'AMZN'
		};
		
		// const pipe = mixedPipe();

		mixedPipe({
			user:			user,
			params:		params,
			recordPipe:	true
		})
			.then(function(result) {
				// vos().clog('MIXED PIPE RESULT', result, true);
				result.testId.should.equal(testId);
				done();
			});
		
	});


});