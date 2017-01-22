'use strict'
const config = require('./config');

const vosMicroServer = require('vos-utilities').vosMicroServer;
const permissionEndpoint = require('./endpoint');

const senecaServer = vosMicroServer.senecaServer(permissionEndpoint, config);

senecaServer.listen();