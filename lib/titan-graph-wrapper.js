'use strict';

var Gremlin = require('gremlin');
var util = require('util');

var TitanGraphWrapper = module.exports = function (gremlin, graph) {
  Gremlin.GraphWrapper.call(this, gremlin, graph);

  this.Order = gremlin.Order;
  this.Cmp = gremlin.Cmp;
  this.Contain = gremlin.Contain;
  this.Geo = gremlin.Geo;
  this.Geoshape = gremlin.Geoshape;
  this.Text = gremlin.Text;
};

util.inherits(TitanGraphWrapper, Gremlin.GraphWrapper);

TitanGraphWrapper.prototype.getVertex = function (key, attr, callback) {
  var gremlin = this.gremlin;
  var txn = this._getTransaction();

  txn.getVertex(key, attr, function (err, v) {
    if (err) return callback(err);
    callback(null, v ? new gremlin.VertexWrapper(gremlin, v) : null);
  });
};
