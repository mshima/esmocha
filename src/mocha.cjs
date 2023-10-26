const Module = require('node:module');

if (Module.register) {
  const { pathToFileURL } = require('node:url');
  Module.register(pathToFileURL(require.resolve('./loader.js')));
}

module.exports = require('mocha-expect-snapshot');
