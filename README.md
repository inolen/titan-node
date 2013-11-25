titan-node
==========

Wrapper project around [gremlin-node](https://github.com/inolen/gremlin-node) to provide out of the box support for [Titan graph database](https://github.com/thinkaurelius/titan).

gremlin-node does not by default include the jar files for Titan, nor does it make assumptions based on using Titan as a backend. This project includes the appropriate Java jar files for Titan 0.4.0, and passes the recommended Java runtime flags to the JVM instance instantiated by gremlin-node.

## Installation

```bash
$ npm install titan-node
```
