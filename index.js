'use strict';

var Gremlin = require('gremlin');
var path = require('path');

module.exports = function (opts) {
  opts = opts || {};
  opts.loglevel = opts.loglevel || 'INFO';
  opts.classpath = opts.classpath || [];
  opts.options = opts.options || [];

  // add titan jars to classpath
  opts.classpath.push(path.join(__dirname, 'target', '**', '*.jar'));

  // add recommended Java runtime flags
  opts.options.push('-XX:+UseThreadPriorities');
  opts.options.push('-XX:ThreadPriorityPolicy=42');
  opts.options.push('-XX:+UseParNewGC');
  opts.options.push('-XX:+UseConcMarkSweepGC');
  opts.options.push('-XX:+CMSParallelRemarkEnabled');
  opts.options.push('-XX:SurvivorRatio=8');
  opts.options.push('-XX:MaxTenuringThreshold=1');
  opts.options.push('-XX:CMSInitiatingOccupancyFraction=75');
  opts.options.push('-XX:+UseCMSInitiatingOccupancyOnly');
  opts.options.push('-XX:+UseTLAB');

  // initialize
  var gremlin = new Gremlin(opts);

  // add Titan-specific data types to the gremlin context, and to the gremlin exports
  var HashSet = gremlin.java.import('java.util.HashSet');
  var imports = new HashSet();
  imports.addSync('com.thinkaurelius.titan.core.Order');
  imports.addSync('com.thinkaurelius.titan.core.attribute.Cmp');
  imports.addSync('com.thinkaurelius.titan.core.attribute.Contain');
  imports.addSync('com.thinkaurelius.titan.core.attribute.Geo');
  imports.addSync('com.thinkaurelius.titan.core.attribute.Geoshape');
  imports.addSync('com.thinkaurelius.titan.core.attribute.Text');
  gremlin.java.callStaticMethodSync('com.tinkerpop.gremlin.groovy.jsr223.DefaultImportCustomizerProvider', 'initializeStatically', imports, null);

  gremlin.Order = gremlin.java.import('com.thinkaurelius.titan.core.Order');
  gremlin.Cmp = gremlin.java.import('com.thinkaurelius.titan.core.attribute.Cmp');
  gremlin.Contain = gremlin.java.import('com.thinkaurelius.titan.core.attribute.Contain');
  gremlin.Geo = gremlin.java.import('com.thinkaurelius.titan.core.attribute.Geo');
  gremlin.Geoshape = gremlin.java.import('com.thinkaurelius.titan.core.attribute.Geoshape');
  gremlin.Order = gremlin.java.import('com.thinkaurelius.titan.core.Order');
  gremlin.Text = gremlin.java.import('com.thinkaurelius.titan.core.attribute.Text');

  Object.defineProperties(Gremlin.GraphWrapper.prototype, {
    Order: {
      get: function () { return this.gremlin.Order; },
      configurable: true
    },
    Cmp: {
      get: function () { return this.gremlin.Cmp; },
      configurable: true
    },
    Contain: {
      get: function () { return this.gremlin.Contain; },
      configurable: true
    },
    Geo: {
      get: function () { return this.gremlin.Geo; },
      configurable: true
    },
    Geoshape: {
      get: function () { return this.gremlin.Geoshape; },
      configurable: true
    },
    Text: {
      get: function () { return this.gremlin.Text; },
      configurable: true
    }
  });

  // set loglevel
  gremlin.java.import('org.slf4j.LoggerFactory')
    .getLoggerSync(gremlin.java.import('org.slf4j.Logger').ROOT_LOGGER_NAME)
    .setLevelSync(gremlin.java.import('ch.qos.logback.classic.Level')[opts.loglevel]);

  return gremlin;
};
