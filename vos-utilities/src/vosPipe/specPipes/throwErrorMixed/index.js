"use strict";
const vos = require('../../../../../Vos');
const oneStep = require('../oneStep/index');
const throwCustomError = require('../throwCustomError/index');

module.exports = (callInfo)=>{
	return vos().VosPipe({
		name:				'throwErrorMixed',
		filename: __filename,
		pipelineParams:	{
		},
		expectedParams:	{
			testId:					'uuid'  // not yet applied
		},
		pipelineSteps: {
			oneStep:							oneStep(),
			throwCustomError:			throwCustomError()
		}
	}, callInfo);
};
