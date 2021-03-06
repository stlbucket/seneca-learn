"use strict";
const moment = require('moment');
const vos = require('../../../../../Vos');

module.exports = (callInfo)=>{
	return vos().VosPipe({
		name:           'simpleOneStepVosPipeline',
		filename:       __filename,
		expectedParams: {
			testId: 'uuid'
		},
		pipelineParams: {
			stepOneCallTime: 'stepOne.callTime'
		},
		pipelineSteps:  {  // any number of functions
			stepOne: function (callInfo) {
				return {
					testId:         callInfo.params.testId,
					callTime:       moment().format('mm.ss.SSSS'),
					isItFunctional: 'close enough for javascript work!'
				};
			}
		}
	}, callInfo);
};