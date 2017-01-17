'use strict'
var seneca = require('seneca');
var SenecaWeb = require('seneca-web');
var Express   = require('express');
var Router    = Express.Router;
const bodyParser = require('body-parser');
const senecaWebAdapterExpress = require('seneca-web-adapter-express');
var context   = new Router();

var senecaWebConfig = {
  context: context,
  adapter: senecaWebAdapterExpress,
  options: {parseBody: false} // so we can use body-parser
};

var app = Express()
  .use(bodyParser.json())
  .use(context)
  .listen(3000);

seneca()
  .use(SenecaWeb, senecaWebConfig)
  .use('api')
  .client({
    type: 'tcp', pin: 'role:api'
  });


