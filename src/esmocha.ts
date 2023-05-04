import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';
import process from 'node:process';
import { execa, type ExecaError } from 'execa';

const require = createRequire(import.meta.url);

export type Options = { executable: string; argv?: string[]; nodeArgv?: string[] };

export default async function run(options?: string | Options) {
  options = typeof options === 'string' ? { executable: options } : options;
  const { executable, argv = process.argv.slice(2), nodeArgv = [] } = options ?? {};
  const loaderUrl = pathToFileURL(require.resolve('@node-loaders/auto/strict')).toString();
  const spawnArgv = executable ? [executable, ...argv] : argv;

  const child = execa(
    process.execPath,
    [
      '--loader',
      loaderUrl,
      '--require',
      require.resolve('./suppress-warnings.cjs'),
      join(require.resolve('mocha'), '../bin/mocha.js'),
      ...nodeArgv,
      ...spawnArgv,
      '--require',
      require.resolve('mocha-expect-snapshot'),
    ],
    {
      stdio: 'inherit',
    },
  );

  for (const eventType of [`SIGINT`, `SIGUSR1`, `SIGUSR2`, `SIGTERM`]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    process.on(eventType, signal => child.kill(signal));
  }

  return child.then(
    result => {
      process.exitCode = result.exitCode;
      return result;
    },
    error => {
      process.exitCode = (error as ExecaError).exitCode;
    },
  );
}
