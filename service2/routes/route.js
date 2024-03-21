const express = require('express');
const serviceController = require('../controller/serviceController');
const service2Controller=require('../controller/service2Controller')
const route = express();

route.get('/api/fetch-data', serviceController.handleRequest);
route.get('/no-circuit/fetch-data',service2Controller.handleRequest2);
module.exports=route