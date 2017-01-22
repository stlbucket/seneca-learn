"use strict";
const vos = require('../../../../../Vos');

module.exports = (callInfo)=>{
	return vos().VosPipe({
		name:          'throwCustomError',
		filename:      __filename,
		pipelineSteps: {
			throwCustomError: function (callInfo) {
				throw vos().VosCustomError('VosCustomUnitTestError_' + callInfo.params.testId, {
					testId: callInfo.params.testId,
				});
			}
		}
	}, callInfo);
};