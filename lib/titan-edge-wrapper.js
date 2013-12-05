'use strict';

var util = require('util');
var Gremlin = require('gremlin');

var TitanEdgeWrapper = module.exports = function (gremlin, el) {
  Gremlin.EdgeWrapper.call(this, gremlin, el);
};

util.inherits(TitanEdgeWrapper, Gremlin.EdgeWrapper);
