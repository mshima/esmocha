const Module = require('node:module');
const process = require('node:process');

if (Module.register) {
  const { pathToFileURL } = require('node:url');
  Module.register(pathToFileURL(require.resolve('./loader.js')));
}

if ('setSourceMapsEnabled' in process && typeof Error.prepareStackTrace !== 'function') {
  process.setSourceMapsEnabled(true);
}

module.exports = require('mocha-expect-snapshot');
