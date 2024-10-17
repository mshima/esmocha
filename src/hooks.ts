import { Module } from 'node:module';
import process from 'node:process';
import snapshot from 'mocha-expect-snapshot';
import type { RootHookObject } from 'mocha';
const { mochaHooks: snapshotHooks } = snapshot;

Module.register(import.meta.resolve('@node-loaders/esbuild/strict'));

if ('setSourceMapsEnabled' in process && typeof Error.prepareStackTrace !== 'function') {
  process.setSourceMapsEnabled(true);
}

const mochaHooks: RootHookObject = {
  ...snapshotHooks,
  async afterAll(...arguments_) {
    const { reset, restoreAllMocks } = await import('./jest-mock.js');
    reset(true);
    restoreAllMocks();
    await (snapshotHooks.afterAll as any)?.call(this, ...arguments_);
  },
};

export default { mochaHooks };
