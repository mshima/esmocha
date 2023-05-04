#!/usr/bin/env node
// eslint-disable-next-line unicorn/prefer-top-level-await
module.exports = (async () => {
  const { default: runner } = await import('./esmocha.js');
  await runner();
})();
