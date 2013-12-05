'use strict';

var util = require('util');
var Gremlin = require('gremlin');
var TitanKeyMakerWrapper = require('./titan-key-maker-wrapper');
var TitanLabelMakerWrapper = require('./titan-label-maker-wrapper');

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

TitanGraphWrapper.prototype.getType = function (name, callback) {
  var txn = this._getTransaction();
  return txn.getType(name, callback);
};

TitanGraphWrapper.prototype.makeKey = function (name) {
  var txn = this._getTransaction();
  return new TitanKeyMakerWrapper(this.gremlin, txn.makeKeySync(name));
};

TitanGraphWrapper.prototype.makeLabel = function (name) {
  var txn = this._getTransaction();
  return new TitanLabelMakerWrapper(this.gremlin, txn.makeLabelSync(name));
};

TitanGraphWrapper.prototype.getVertex = function (key, attr, callback) {
  if (callback === undefined) {
    callback = attr;
    return Gremlin.GraphWrapper.prototype.getVertex.call(this, key, callback);
  }

  var gremlin = this.gremlin;
  var txn = this._getTransaction();

  txn.getVertex(key, attr, function (err, v) {
    if (err) return callback(err);
    callback(null, v ? gremlin.wrapVertex(v) : null);
  });
};
