'use strict';

var assert = require('assert');
var temp = require('temp');
var Gremlin = require('../lib/titan-gremlin');

// make sure we cleanup temporary files at exit
temp.track();

suite('titan-graph-wrapper', function () {
  var gremlin;
  var graph;
  var g;

  suiteSetup(function () {
    gremlin = new Gremlin({ loglevel: 'OFF' });
  });

  setup(function () {
    var GraphOfTheGodsFactory = gremlin.java.import('com.thinkaurelius.titan.example.GraphOfTheGodsFactory');
    graph = GraphOfTheGodsFactory.createSync(temp.mkdirSync());
    g = gremlin.wrap(graph);
  });

  test('getVertex(id)', function (done) {
    g.getVertex('name', 'saturn', function (err, v1) {
      assert(!err && v1);

      g.getVertex(v1.getId(), function (err, v2) {
        assert(!err && v2);
        done();
      });
    });
  });

  test('getVertex(key, value)', function (done) {
    g.getVertex('name', 'saturn', function (err, v) {
      assert(!err && v);

      v.getProperty('name', function (err, name) {
        assert(!err && name === 'saturn');
        done();
      });
    });
  });

  test('makeKey(name) unique', function (done) {
    g.makeKey('extra_id').dataType(gremlin.ClassTypes.Integer).indexed(gremlin.ClassTypes.Vertex).unique().make(function (err) {
      assert(!err);
      g.getType('extra_id', function (err, type) {
        assert(!err && type);
        done();
      });
    });
  });

  test('makeKey(name) single', function (done) {
    g.makeKey('gender').dataType(gremlin.ClassTypes.Integer).indexed('search', gremlin.ClassTypes.Vertex).single().make(function (err) {
      assert(!err);
      g.getType('gender', function (err, type) {
        assert(!err && type);
        done();
      });
    });
  });

  test('makeKey(name) geo', function (done) {
    g.makeKey('pos').dataType(gremlin.ClassTypes.Geoshape).indexed('search', gremlin.ClassTypes.Vertex).single().make(function (err) {
      assert(!err);
      g.getType('pos', function (err, type) {
        assert(!err && type);
        done();
      });
    });
  });
});
