"use strict";
const vos = require('../../../../../Vos');

module.exports = (callInfo)=>{
	return vos().VosPipe({
		name:          'nullReferenceError',
		filename:      __filename,
		pipelineParams:	{
		},
		expectedParams:	{
		},
		pipelineSteps: {
			testMethodError: function (callInfo) {
				var x = callInfo.thisWillNotExist.thing;
				return x;
			}
		},
	}, callInfo);
};