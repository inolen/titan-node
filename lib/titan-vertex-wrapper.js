'use strict';

var util = require('util');
var TitanElementWrapper = require('./titan-element-wrapper');

var TitanVertexWrapper = module.exports = function (gremlin, el) {
  TitanElementWrapper.call(this, gremlin, el);
};

util.inherits(TitanVertexWrapper, TitanElementWrapper);
