# esmocha

[Mocha](https://mochajs.org) wrapper with built-in [typescript](https://github.com/node-loaders/loaders/tree/main/workspaces/esbuild), built-in [expect](https://jestjs.io/docs/expect) with [mock](https://github.com/node-loaders/loaders/tree/main/workspaces/jest-mock) and [snapshot](https://github.com/mshima/mocha-expect-snapshot) support.

## Usage

```sh
npm install esmocha --save-dev
```

`esmocha` executable is a wrapper for `mocha` executable, every option should work.

```sh
npx esmocha
```

Every method is re-exported.

```js
// expect lib
import { expect } from 'esmocha';
// mocking lib
import { mock, resetAllMocks } from 'esmocha';
// mocha lib
import { afterAll, beforeAll } from 'esmocha';
```

Updating expect snapshots:

```
npx esmocha --update-snapshot
```

## License

MIT
