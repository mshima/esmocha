import { describe, expect, esmocha } from '../dist/index.js';

describe('esmocha', () => {
  afterEach(() => {
    esmocha.reset();
  });

  it('should run', () => {
    expect(true).toBeTruthy();
  });

  it('should mock modules', async () => {
    const pathMock = await esmocha.mock('path', import('node:path'));
    const pathMocked = await import('node:path');
    expect(esmocha.isMockFunction(pathMock.relative)).toBe(true);
    expect(pathMock.relative).toBe(pathMocked.relative);

    pathMocked.relative('a', 'b');
    expect(pathMock.relative).toHaveBeenCalled();
  });

  it('should mock relative files', async () => {
    const pathMock = await esmocha.mock('./dummy-mocked-module.ts', import('node:path'));
    const pathMocked = (await import('./dummy-mocked-module.ts')) as unknown as typeof pathMock;
    expect(esmocha.isMockFunction(pathMock.relative)).toBe(true);
    expect(pathMock.relative).toBe(pathMocked.relative);

    pathMocked.relative('a', 'b');
    expect(pathMock.relative).toHaveBeenCalled();
  });

  it('non promises mock inject the object as it is', async () => {
    const pathMock = await esmocha.mock('path', { ...(await import('node:path')) });
    expect(esmocha.isMockFunction(pathMock.relative)).toBe(false);
  });
});
