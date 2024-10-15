import { describe, expect, esmocha } from '../dist/index.js';

describe('esmocha', () => {
  it('should run', () => {
    expect(true).toBeTruthy();
  });

  it('should mock modules', async () => {
    const pathMock = await esmocha.mock('path', import('node:path'));
    const pathMocked = await import('node:path');
    expect(pathMock.relative).toBe(pathMocked.relative);

    pathMocked.relative('a', 'b');
    expect(pathMock.relative).toHaveBeenCalled();
  });

  it('should mock relative files', async () => {
    const pathMock = await esmocha.mock('./dummy-mocked-module.js', import('node:path'));
    const pathMocked = (await import('./dummy-mocked-module.js')) as unknown as typeof pathMock;
    expect(pathMock.relative).toBe(pathMocked.relative);

    pathMocked.relative('a', 'b');
    expect(pathMock.relative).toHaveBeenCalled();
  });
});
