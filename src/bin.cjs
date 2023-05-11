#!/usr/bin/env node
const { join } = require('node:path');
const process = require('node:process');
const { pathToFileURL } = require('node:url');

let updateSnapshotIndex = process.argv.indexOf('--update-snapshot');
if (updateSnapshotIndex === -1) {
  updateSnapshotIndex = process.argv.indexOf('--updateSnapshot');
}

if (updateSnapshotIndex > -1) {
  let updateSnapshotValue = process.argv.length > updateSnapshotIndex + 1 ? process.argv[updateSnapshotIndex + 1] : 'all';
  updateSnapshotValue = updateSnapshotValue === 'new' ? 'new' : 'all';
  process.env.UPDATE_SNAPSHOT = updateSnapshotValue;
}

// eslint-disable-next-line unicorn/prefer-top-level-await
module.exports = (async () => {
  const { default: esbuildx } = await import('@node-loaders/esbuildx');
  await esbuildx({
    executable: join(require.resolve('mocha'), '../bin/mocha.js'),
    loaderUrl: pathToFileURL(require.resolve('@node-loaders/auto/strict')).toString(),
    additionalArgv: ['--require', require.resolve('mocha-expect-snapshot')],
  });
})();
