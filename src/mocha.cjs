const Module = require('node:module');
const process = require('node:process');
const { pathToFileURL } = require('node:url');
/** @type {import('mocha').RootHookObject} */
const { mochaHooks } = require('mocha-expect-snapshot');

Module.register(pathToFileURL(require.resolve('@node-loaders/esbuild/strict')));

if ('setSourceMapsEnabled' in process && typeof Error.prepareStackTrace !== 'function') {
  process.setSourceMapsEnabled(true);
}

module.exports = { mochaHooks };
