'use strict';

var TitanLabelMakerWrapper = module.exports = function (gremlin, maker) {
  this.gremlin = gremlin;
  this.maker = maker;
};

TitanLabelMakerWrapper.prototype.name = function (name) {
  this.maker.nameSync(name);
  return this;
};

TitanLabelMakerWrapper.prototype.directed = function () {
  this.maker.directedSync();
  return this;
};

TitanLabelMakerWrapper.prototype.unidirected = function () {
  this.maker.unidirectedSync();
  return this;
};

TitanLabelMakerWrapper.prototype.oneToMany = function () {
  var args = Array.prototype.slice.call(arguments);
  this.maker.oneToManySync.apply(this.maker, args);
  return this;
};

TitanLabelMakerWrapper.prototype.manyToOne = function () {
  var args = Array.prototype.slice.call(arguments);
  this.maker.manyToOneSync.apply(this.maker, args);
  return this;
};

TitanLabelMakerWrapper.prototype.oneToOne = function () {
  var args = Array.prototype.slice.call(arguments);
  this.maker.oneToOneSync.apply(this.maker, args);
  return this;
};

TitanLabelMakerWrapper.prototype.manyToMany = function () {
  this.maker.manyToManySync();
  return this;
};

TitanLabelMakerWrapper.prototype.signature = function () {
  var types = Array.prototype.slice.call(arguments);
  types = this.gremlin.java.newArray('com.thinkaurelius.titan.core.TitanType', types);
  this.maker.signatureSync(types);
  return this;
};

TitanLabelMakerWrapper.prototype.sortKey = function () {
  var types = Array.prototype.slice.call(arguments);
  types = this.gremlin.java.newArray('com.thinkaurelius.titan.core.TitanType', types);
  this.maker.sortKeySync(types);
  return this;
};

TitanLabelMakerWrapper.prototype.sortOrder = function (order) {
  this.maker.sortOrderSync(order);
  return this;
};

TitanLabelMakerWrapper.prototype.hidden = function () {
  this.maker.hiddenSync();
  return this;
};

TitanLabelMakerWrapper.prototype.unModifiable = function () {
  this.maker.unModifiableSync();
  return this;
};

TitanLabelMakerWrapper.prototype.makeStatic = function (direction) {
  this.maker.makeStaticSync(direction);
  return this;
};

TitanLabelMakerWrapper.prototype.make = function (callback) {
  return this.maker.make(callback);
};
