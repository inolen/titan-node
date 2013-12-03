'use strict';

var TitanKeyMakerWrapper = module.exports = function (gremlin, maker) {
  this.gremlin = gremlin;
  this.maker = maker;
};

TitanKeyMakerWrapper.prototype.name = function (name) {
  this.maker.nameSync(name);
  return this;
};

TitanKeyMakerWrapper.prototype.dataType = function (clazz) {
  this.maker.dataTypeSync(clazz);
  return this;
};

TitanKeyMakerWrapper.prototype.list = function () {
  this.maker.listSync();
  return this;
};

TitanKeyMakerWrapper.prototype.single = function () {
  var args = Array.prototype.slice.call(arguments);
  this.maker.singleSync.apply(this.maker, args);
  return this;
};

TitanKeyMakerWrapper.prototype.unique = function () {
  var args = Array.prototype.slice.call(arguments);
  this.maker.uniqueSync.apply(this.maker, args);
  return this;
};

TitanKeyMakerWrapper.prototype.indexed = function (indexName, clazz, param/*, ...*/) {
  if (clazz === undefined && params === undefined) {
    clazz = indexName;
    this.maker.indexedSync(clazz);
    return this;
  }

  // parse varargs params
  var params = param === undefined ? [] : Array.prototype.slice.call(arguments).slice(2);
  params = this.gremlin.java.newArray('com.thinkaurelius.titan.core.Parameter', params);
  
  this.maker.indexedSync(indexName, clazz, params);

  return this;
};

TitanKeyMakerWrapper.prototype.hidden = function () {
  this.maker.hiddenSync();
  return this;
};

TitanKeyMakerWrapper.prototype.unModifiable = function () {
  this.maker.unModifiableSync();
  return this;
};

TitanKeyMakerWrapper.prototype.makeStatic = function (direction) {
  this.maker.makeStaticSync(direction);
  return this;
};

TitanKeyMakerWrapper.prototype.signature = function (types) {
  var types = Array.prototype.slice.call(arguments);
  types = this.gremlin.java.newArray('com.thinkaurelius.titan.core.TitanType', types);
  this.maker.signatureSync(types);
  return this;
};

TitanKeyMakerWrapper.prototype.sortKey = function (types) {
  var types = Array.prototype.slice.call(arguments);
  types = this.gremlin.java.newArray('com.thinkaurelius.titan.core.TitanType', types);
  this.maker.sortKeySync(types);
  return this;
};

TitanKeyMakerWrapper.prototype.sortOrder = function (order) {
  this.maker.sortOrderSync(order);
  return this;
};

TitanKeyMakerWrapper.prototype.make = function (callback) {
  return this.maker.make(callback);
};
