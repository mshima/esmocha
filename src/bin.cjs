#!/usr/bin/env node
const { join } = require('node:path');
const { pathToFileURL } = require('node:url');

// eslint-disable-next-line unicorn/prefer-top-level-await
module.exports = (async () => {
  const { default: esbuildx } = await import('./esbuildx.js');
  await esbuildx({
    executable: join(require.resolve('mocha'), '../bin/mocha.js'),
    loaderUrl: pathToFileURL(require.resolve('@node-loaders/auto/strict')).toString(),
    additionalArgv: ['--require', require.resolve('mocha-expect-snapshot')],
  });
})();
