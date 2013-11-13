var Gremlin = require('gremlin');
var path = require('path');

module.exports = function (opts) {
  opts = opts || {};
  opts.classpath = opts.classpath || [];

  // add titan jars to classpath
  opts.classpath.push(path.join(__dirname, 'target', '**', '*.jar'));

  return new Gremlin(opts);
};
