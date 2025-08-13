import { type FlatXoConfig } from 'xo';

export default [
  {
    space: 2,
    prettier: true,
  },
  {
    files: 'test/*',
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
] satisfies FlatXoConfig;
