'use strict';

var Gremlin = require('gremlin');
var path = require('path');

module.exports = function (opts) {
  opts = opts || {};
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

  return new Gremlin(opts);
};
