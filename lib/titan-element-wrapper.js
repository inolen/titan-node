'use strict';

var util = require('util');
var Gremlin = require('gremlin');

var TitanElementWrapper = module.exports = function (gremlin, el) {
  Gremlin.ElementWrapper.call(this, gremlin, el);
};

util.inherits(TitanElementWrapper, Gremlin.ElementWrapper);
