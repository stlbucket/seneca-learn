"use strict";
const vos = require('../../../../../Vos');

module.exports = (callInfo)=>{
	return vos().VosPipe({
		name:          'throwJsError',
		filename:      __filename,
		pipelineSteps: {
			throwJsError: function (callInfo) {
				throw new Error(`UnitTest Error - ${callInfo.params.testId}`);
			}
		}
	}, callInfo);
};