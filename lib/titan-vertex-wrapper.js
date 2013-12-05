'use strict';

var util = require('util');
var Gremlin = require('gremlin');

var TitanVertexWrapper = module.exports = function (gremlin, el) {
  Gremlin.VertexWrapper.call(this, gremlin, el);
};

util.inherits(TitanVertexWrapper, Gremlin.VertexWrapper);
