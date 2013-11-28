'use strict';

var util = require('util');
var TitanElementWrapper = require('./titan-element-wrapper');

var TitanEdgeWrapper = module.exports = function (gremlin, el) {
  TitanElementWrapper.call(this, gremlin, el);
};

util.inherits(TitanEdgeWrapper, TitanElementWrapper);
