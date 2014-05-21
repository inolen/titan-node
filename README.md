titan-node
==========

Wrapper around [gremlin-node](https://github.com/inolen/gremlin-node) to provide out of the box support for [Titan graph database](https://github.com/thinkaurelius/titan).

gremlin-node does not include the jar files for Titan, nor does it make any assumptions based on using Titan as a backend. This project customizes gremlin-node to make it easier to get up and running:

 * includes the appropriate Java jar files for Titan 0.4.1 in the classpath
 * adds Titan-specific enums and data types to the gremlin object (e.g. Geo and Geoshape)
 * adds `loglevel` option to the gremlin constructor to control Titan verbosity. see [logback's documentation](http://logback.qos.ch/manual/architecture.html) for all available levels
 * passes the recommended runtime flags to the JVM instance instantiated by gremlin-node

## Installation

```bash
$ npm install titan-node
```

## Quick start

```javascript
var Titan = require('titan-node');
var gremlin = new Titan.Gremlin({ loglevel: 'OFF' });

var GraphOfTheGodsFactory = gremlin.java.import('com.thinkaurelius.titan.example.GraphOfTheGodsFactory');

var graph = GraphOfTheGodsFactory.createSync('testdirectory');
var g = gremlin.wrap(graph);

g.V('name', 'saturn').next(function (err, saturn) {
  g.start(saturn).in('father').in('father').next(function (err, grandchild) {
    grandchild.getProperty('name', function(err, name)  {
      console.log(name);
    });
  });
});
```

## The Graph of the Gods

These examples will attempt to mimic [Getting Started](https://github.com/thinkaurelius/titan/wiki/Getting-Started) from the Titan wiki using the graph visualized below.

![The Graph of the Gods](https://raw.githubusercontent.com/wiki/thinkaurelius/titan/images/graph-of-the-gods-2.png)

Error handling is omitted to keep the code readable.

>> gremlin> saturn = g.V('name','saturn').next()

```javascript
> g.V('name', 'saturn').next(function (err, vertex) {
    console.log(vertex.toJSON());
  });

{ id: '4' }
```


>> gremlin> saturn.map()

```javascript
> g.V('name', 'saturn').map().next(function (err, properties) {
    console.log(properties);
  });

{ name: 'saturn', age: 10000, type: 'titan' }
```


>> gremlin> saturn.in('father').in('father').name

```javascript
> g.V('name', 'saturn').in('father').in('father').next(function(err, vertex) {
    vertex.getProperty('name', function(err, value) {
      console.log(value);
    });
  });

hercules
```


>> gremlin> g.E.has('place',WITHIN,Geoshape.circle(37.97,23.72,50))

```javascript
> g.E().has('place', g.Geo.WITHIN, g.Geoshape.circleSync(37.97,23.72,50)).next(function(err, val) {
    console.log(val.toJSON());
  });
```
