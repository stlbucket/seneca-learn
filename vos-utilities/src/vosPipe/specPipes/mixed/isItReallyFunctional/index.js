"use strict";
const vos = require('../../../../../../Vos');

module.exports = (callInfo)=> {
	return vos().VosPipe({
		name:           'isItReallyFunctional',
		filename:       __filename,
		expectedParams: {
			isItFunctional: 'string'
		},
		pipelineSteps:  {  // any number of functions
			isItReallyFunctional: function (callInfo) {
				return callInfo.params.isItFunctional === 'close enough for javascript work!'
			}
		}
	}, callInfo)
};

