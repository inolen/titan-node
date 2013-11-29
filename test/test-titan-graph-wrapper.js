'use strict';

var assert = require('assert');
var temp = require('temp');
var Gremlin = require('../lib/titan-gremlin');

// make sure we cleanup temporary files at exit
temp.track();

suite('titan-graph-wrapper', function() {
  var gremlin;
  var graph;
  var g;

  suiteSetup(function() {
    gremlin = new Gremlin({ loglevel: 'OFF' });
  });

  setup(function() {
    var GraphOfTheGodsFactory = gremlin.java.import('com.thinkaurelius.titan.example.GraphOfTheGodsFactory');
    graph = GraphOfTheGodsFactory.createSync(temp.mkdirSync());
    g = gremlin.wrap(graph);
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
});
