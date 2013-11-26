'use strict';

var path = require('path');
var util = require('util');
var Gremlin = require('gremlin');
var TitanGraphWrapper = require('./titan-graph-wrapper');

var TitanGremlin = module.exports = function (opts) {
  opts = opts || {};
  opts.loglevel = opts.loglevel || 'INFO';
  opts.classpath = opts.classpath || [];
  opts.options = opts.options || [];

  // add titan jars to classpath
  opts.classpath.push(path.join(__dirname, '..', 'target', '**', '*.jar'));

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

  // run base constructor
  Gremlin.call(this, opts);

  // add Titan-specific data types to the gremlin context, and to the gremlin exports
  var HashSet = this.java.import('java.util.HashSet');
  var imports = new HashSet();
  imports.addSync('com.thinkaurelius.titan.core.Order');
  imports.addSync('com.thinkaurelius.titan.core.attribute.Cmp');
  imports.addSync('com.thinkaurelius.titan.core.attribute.Contain');
  imports.addSync('com.thinkaurelius.titan.core.attribute.Geo');
  imports.addSync('com.thinkaurelius.titan.core.attribute.Geoshape');
  imports.addSync('com.thinkaurelius.titan.core.attribute.Text');
  this.java.callStaticMethodSync('com.tinkerpop.gremlin.groovy.jsr223.DefaultImportCustomizerProvider', 'initializeStatically', imports, null);

  this.Order = this.java.import('com.thinkaurelius.titan.core.Order');
  this.Cmp = this.java.import('com.thinkaurelius.titan.core.attribute.Cmp');
  this.Contain = this.java.import('com.thinkaurelius.titan.core.attribute.Contain');
  this.Geo = this.java.import('com.thinkaurelius.titan.core.attribute.Geo');
  this.Geoshape = this.java.import('com.thinkaurelius.titan.core.attribute.Geoshape');
  this.Order = this.java.import('com.thinkaurelius.titan.core.Order');
  this.Text = this.java.import('com.thinkaurelius.titan.core.attribute.Text');

  // use our custom TitanGraphWrapper
  this.GraphWrapper = TitanGraphWrapper;

  // set loglevel
  this.java.import('org.slf4j.LoggerFactory')
    .getLoggerSync(this.java.import('org.slf4j.Logger').ROOT_LOGGER_NAME)
    .setLevelSync(this.java.import('ch.qos.logback.classic.Level')[opts.loglevel]);
};

util.inherits(TitanGremlin, Gremlin);
