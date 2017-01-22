"use strict";
var uuid = require('node-uuid');
var vos = require('../../../../../Vos');
var should = require('should');

const nullReferenceErrorPipe = require('./index');

describe(__filename, function() {
	
	it('nullReferenceError pipe', function (done) {
		const testId = uuid.v4();
		const user ={ login:	"who@cares.com" };
		const	params = {
			testId: testId,
			input:  "THIS IS VOS"
		};
		
		const pipe = nullReferenceErrorPipe();
		
		pipe.execute({
			user:			user,
			params:		params,
			recordPipe:	true
		})
			.then(function(result) {
				done(result);
			})
			.catch((expectAnError)=>{
				// vos().clog('VOS WORKSPACE', pipe.ws, true);
				expectAnError.name.should.equal('TypeError');
				done();
			});
		
	});


});