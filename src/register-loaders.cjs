const Module = require('node:module');
const { pathToFileURL } = require('node:url');

exports.mochaHooks = () => {
  Module.register(pathToFileURL(require.resolve('./loader.js')));

  return {};
};
