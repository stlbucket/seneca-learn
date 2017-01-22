"use strict";
var uuid = require('node-uuid');
var vos = require('../../../../../Vos');
var should = require('should');

const oneStepPipe = require('./index');

describe(__filename, function() {
	
	it('throwCustomError pipe', function (done) {
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
				done(result);
			})
			.catch((error)=>{
				// vos().clog('VOS WORKSPACE', pipe.ws, true);
				error.name.indexOf('Vos').should.equal(0);
				done();
			});
		
	});


});