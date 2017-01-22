"use strict";
const moment  = require('moment');
const R       = require('ramda');
const Promise = require('bluebird');
const uuid    = require('node-uuid');
const Ajv     = require('ajv');
const ajv     = new Ajv();

// see example pipe: scripts/core/vosPipe/specPipes/multiStep/index.js
// and the associated spec: scripts/core/vosPipe/specPipes/multiStep/spec.js

module.exports = (pipeDef, callInfo)=> {
  // create an instance of the pipe in question
  const pipe = new VosPipe(pipeDef);
  // if callInfo is supplied, immediately execute the pipe
  // otherwise, return the pipe itself
  // caller is responsible for later explicitly calling the [execute] method
  // currying may also be used up the stack
  return R.is(Object, callInfo) ? pipe.execute(callInfo) : pipe;
};

const VosPipe = class {
  constructor(pipe) {
    // todo: move this to a config setting
    this.momentFormatString = 'YYYY-MM-DD HH:mm:ss:SSSS';
    this.vosPipe           = pipe;
    this.ajvKeywords        = pipe.ajvKeywords;
    this.pipelineSteps      = R.clone(this.vosPipe.pipelineSteps); // necessary?  todo: investigate this
  }

  execute(callInfo) {
    // if there is a dbTree present, pipe errors will be recorded
    // const dbTree = vos().dbTree || {	vos_core_db:	'NO DATA TREE' };

    // todo: refactor to clean this up
    this.callInfo       = R.clone(callInfo);
    this.params         = callInfo.params || R.omit('user', callInfo);
    this.user           = R.is(Object, this.callInfo.user) ? callInfo.user : {login: 'NO_USER'};
    this.parentPipeName = R.is(Object, this.callInfo.parent) ? this.callInfo.parent.name : 'NO_PARENT';
    this.recordPipe     = callInfo.recordPipe; // === true && R.is(Object, dbTree.vos_core_db) && this.parentPipeName === 'NO_PARENT';

    this.createWorkspace();

    return this.validateExpectedParams()
      .then(() => {
        return this.executeSteps();
      })
      .then(()=> {
        // todo: refactor to make support for noDb configurations error-proof
        // todo: and to optionally report errors to another vos instance

        // this.recordPipe = R.is(Object, vos().dbTree) && R.is(Object, vos().dbTree.vos_core_db);
        if (this.recordPipe === true) {
          return this.workspace.dbRecord = 'SENT TO RABBIT MQ';
          // vos().clog('RECORDING PIPE', this.ws.name);
          // return vos().dbTree.vos_core_db.table.vos_pipe.save({
          // 	params:	{
          // 		name:				this.ws.name,
          // 		uid:				this.ws.uid,
          // 		workspace:	this.ws,
          // 		vosPipeStatusId:	1
          // 	}
          // });
        } else {
          return this.workspace.dbRecord = 'NO DATABASE RECORD';
        }
      })
      .then(()=> {
        return this.workspace.finalResult;
      })
      .catch((error)=> {
        // server spin-up pipes and those that use external resources
        // may have the exitProcessOnError flag set to true if needed
        // currently this is used sparingly, but for production, this feature will matter

        // THIS IS WHERE WE DUMP THE ERROR TO RABBIT MQ
        // BUT FOR NOW, WE JUST...
        // vos().clog(`VOS PIPE ERROR - RAW - ${this.workspace.name}`, error);
        if (this.workspace.exitProcessOnError === true) {
          vos().clog('VOS PIPE ERROR - ENDING PROCESS - WORKSPACE', this.workspace);
          process.exit();
        }

        throw error;
      });
  }

  executeSteps() {
    const {pipelineSteps} = this.vosPipe;

    // this is the core of it all
    // we use the coroutine to update the workspace
    // after each pipelineStep is executed
    const co = Promise.coroutine(function *() {
      let fnKeys = Reflect.ownKeys(pipelineSteps);

      for (let fnKey of fnKeys) {
        const stepFn = pipelineSteps[fnKey];
        this.preProcessStep(fnKey, stepFn);

        const stepResult = yield Promise.resolve(this.executeStep(fnKey, stepFn));

        this.recordStepResult(fnKey, stepResult, stepFn);
        this.capturePipelineParamValues();
      }
    }).bind(this);


    return co();
  }

  createWorkspace() {
    // the workspace is the record of pipe execution

    return this.workspace = {
      user: this.user,
      params: this.params,
      uid: uuid.v4(),
      name: this.vosPipe.name,
      parentPipeName: this.parentPipeName,
      pipelineSteps: this.pipelineSteps,
      expectedParams: this.vosPipe.expectedParams || {},
      pipelineParams: this.vosPipe.pipelineParams || {},
      pipelineParamValues: {},
      stepMetrics: {},
      stepResults: {},
      stepResultsDeep: {},
      exitProcessOnError: this.vosPipe.exitProcessOnError || false
    };
  }

  validateExpectedParams() {
    if (['verifyAge', 'calculateAge', 'addWalkIn'].includes(this.ws.name) === true) {
      // console.log('LET US VALIDATE', this.ws.name);
      R.toPairs(this.ajvKeywords).forEach(
        (keyValuePair) => {
          const keyword    = keyValuePair[0];
          const definition = keyValuePair[1];
          try {
            ajv.addKeyword(keyword, definition);
          } catch (error) {
            // console.log('error', error);
          }
        }
      );

      const schema = R.merge(
        this.ws.expectedParams,
        {
          "$async": true,
        }
      );

      const workspace = this.ws;

      return ajv.validate(schema, this.ws.params)
        .catch(function (err) {
          if (!(err instanceof Ajv.ValidationError)) throw err;
          // data is invalid
          // console.log('Validation errors:', err);
          const vosError = vos().VosCustomError('VosPipeInvalidParameters', {
            pipeName: workspace.name,
            expectedParams: workspace.expectedParams,
            actualParams: workspace.params,
            validationErrors: err.errors
          });
          // console.log('NEW ERROR', vosError);
          throw vosError;
        });
    } else {
      return Promise.resolve(true);
    }
  }

  preProcessStep(fnKey) {
    this.workspace.stepMetrics[fnKey] = this.workspace.stepMetrics[fnKey] || {};

    this.workspace.stepMetrics[fnKey].startTimestamp = moment().format(this.momentFormatString);
  }

  recordStepResult(fnKey, stepResult, stepFn) {
    this.workspace.stepMetrics[fnKey].endTimestamp = moment().format(this.momentFormatString);

    // record stepResults - these are used selectively along the way via pipelineParams
    this.workspace.stepResults[fnKey] = this.workspace.stepResults[fnKey] || {};
    // the current stepResult becomes finalResult
    this.workspace.finalResult        = this.workspace.stepResults[fnKey] = stepResult;

    // stepResultsDeep allows us to look at pipes within pipes in one workspace
    if (stepFn instanceof VosPipe) {
      this.workspace.stepResultsDeep[fnKey] = stepFn.ws.stepResults;
    } else {
      this.workspace.stepResultsDeep[fnKey] = stepResult;
    }

    // vos().clog('CURRENT WORKSPACE', this.workspace);
  }

  capturePipelineParamValues() {
    // pipelineParams are captured in pipelineParamValues after each step
    this.workspace.pipelineParamValues = R.mapObjIndexed((path, key, obj)=> {
      return R.path(path.split('.'), this.workspace.stepResults)
    }, this.workspace.pipelineParams);
  }

  executeCallInfoFunctionStep(stepFn) {
    // todo: look into R.clone for the params so that within each function, params are immutable
    return stepFn({
      user: this.workspace.user,
      params: R.merge(R.clone(this.workspace.params), R.clone(this.workspace.pipelineParamValues))
    });
  };

  executeVosPipeStep(stepFn) {
    return stepFn.execute({
      user: this.workspace.user,
      params: R.merge(R.clone(this.workspace.params), R.clone(this.workspace.pipelineParamValues)),
      parent: this
    });
  }

  executeStep(fnKey, stepFn) {
    // todo: potentially refactor this using R.curry so there is no switch here
    switch (typeof stepFn) {
      case 'function':
        return this.executeCallInfoFunctionStep(stepFn);
        break;
      case 'object':
        if (!(stepFn instanceof VosPipe)) throw vos().VosCustomError('VosPipeInvalidStepObject', this.ws);
        return this.executeVosPipeStep(stepFn);
        break;
      default:
        throw vos().VosCustomError('VosPipeInvalidPipeType', {
          pipeName: this.vosPipe.name,
          stepName: fnKey,
          pipeType: typeof stepFn,
        });
        break;
    }
  }

  get ws() {
    // there is likely a more efficient way to export the workspace
    // the reason for this is that the workspace needs to be a string
    // since params may be functions, we need to clean the workspace of them
    return JSON.parse(JSON.stringify(this.workspace));
  }
};



// todo: implement expected params enforcement
// todo: add config to record pipelines selectively
// todo: add config to report errors to a service
// todo: implement socketsApi
// todo: add docker support and extend config as needed
// todo: update workspace manipulation using ramda
//
