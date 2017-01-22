'use strict'
const config = require('./config');
const endpoint = require('./endpoint');
const senecaServer = require('vos-utilities').vosMicroServer.senecaServer(config, endpoint);

senecaServer.listen();