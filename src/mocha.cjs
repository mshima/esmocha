const Module = require('node:module');
const process = require('node:process');
const { pathToFileURL } = require('node:url');
/** @type {import('mocha').RootHookObject} */
const snapshotHooks = require('mocha-expect-snapshot').mochaHooks;

Module.register(pathToFileURL(require.resolve('@node-loaders/esbuild/strict')));

if ('setSourceMapsEnabled' in process && typeof Error.prepareStackTrace !== 'function') {
  process.setSourceMapsEnabled(true);
}

/** @type {import('mocha').RootHookObject} */
const mochaHooks = {
  ...snapshotHooks,
  async afterAll(...arguments_) {
    const { reset, restoreAllMocks } = await import('./jest-mock.js');
    reset(true);
    restoreAllMocks();
    await snapshotHooks.afterAll?.call(this, ...arguments_);
  },
};

module.exports = { mochaHooks };
