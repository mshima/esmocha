#!/usr/bin/env node
const Module = require('node:module');
const { join } = require('node:path');
const process = require('node:process');
const { pathToFileURL } = require('node:url');

if (!Module.register) {
  throw new Error('Node.js version must be >=20.6.0 or >=18.19.0');
}

let updateSnapshotIndex = process.argv.indexOf('--update-snapshot');
if (updateSnapshotIndex === -1) {
  updateSnapshotIndex = process.argv.indexOf('--updateSnapshot');
}

if (updateSnapshotIndex > -1) {
  let updateSnapshotValue = process.argv.length > updateSnapshotIndex + 1 ? process.argv[updateSnapshotIndex + 1] : 'all';
  updateSnapshotValue = updateSnapshotValue === 'new' ? 'new' : 'all';
  process.env.UPDATE_SNAPSHOT = updateSnapshotValue;
}

const executable = join(require.resolve('mocha'), '../bin/mocha.js');
const mochaRequire = require.resolve('./hooks.js');
// eslint-disable-next-line unicorn/prefer-top-level-await
module.exports = (async () => {
  process.argv.push('--require', mochaRequire);
  await import(pathToFileURL(executable));
})();
