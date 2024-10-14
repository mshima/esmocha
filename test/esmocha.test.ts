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
});
