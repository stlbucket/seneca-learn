"use strict";
const Promise = require('bluebird');
const vos = require('../../../../../Vos');
const oneStep = require('../oneStep/index');

// things you need to know:
// - name:            [required] - umm...
// - __filename:      [required] - this helps pinpoint errors
// - expectedParams:  [optional] - still under development, will do what you expect it to
// - pipelineSteps:   [required] - one or more functions to be executed sequentially
//                                 callInfo is of the form { user: {}, params: {}}
// - pipelineParams: 	[optional] - as each step is completed, any results that are referenced
//                                 by pipeline params are included in subsequent callInfo.params in function calls
// - expectedReturn:  [optional] still under consideration for development
//
// -------------------
//
// intended benefits of the vosPipe are:
// - a standard coding pattern for server-side code
//     > easy to unit test
//     > easy to code review
//     > easy to keep splitting up functions while coordinating which params need to flow where (in theory?)
// -  transparent
//     > error handling and reporting
//     > input validation
// - optional basic performance metrics
// - optional execution record - support user session auditing, bug fixes, etc.
//
// -------------------

module.exports = (callInfo)=>{
	return vos().VosPipe({
		name:           'multiStepPipe',
		filename:       __filename,
		expectedParams: {
			testId: 'uuid'
		},
		expectedReturn: {},
		pipelineParams: {
			stepOneMessage: 'stepOne.message'
		},
		pipelineSteps:  {  // any number of functions
			stepOne: function (callInfo) {
				// vos().clog('STEP ONE', callInfo);
				return {
					testId:  callInfo.params.testId,
					message: 'Message from step 1'
				};
			},
			stepTwo: function (callInfo) {
				// vos().clog('STEP TWO', callInfo);
				var message = callInfo.params.stepOneMessage || 'FAIL';
				return {
					testId:  callInfo.params.testId,
					message: 'Got message from step 1...  ' + message
				};
			},
      returnNull: (callInfo) => {
        console.log('DOING NOTHING HERE');
      },
      returnPromiseNothering: (callInfo) => {
        return Promise.resolve()
          .then(() => {
            console.log('SERIOUSLY DOING NOTHING HERE');
          });
      },
      oneStep:	oneStep()
		}
	}, callInfo);
};
