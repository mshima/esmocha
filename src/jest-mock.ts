import { ModuleMocker, type Mocked } from 'jest-mock';
import type Quibble from 'quibble';
import { resolveCallerUrl } from './caller-resolve.js';

let quibble: typeof Quibble;
const moduleMocker = new ModuleMocker(globalThis);

export const resetAllMocks = moduleMocker.resetAllMocks.bind(moduleMocker);

export const fn = moduleMocker.fn.bind(moduleMocker);

export const spyOn = moduleMocker.spyOn.bind(moduleMocker);

export const restoreAllMocks = moduleMocker.restoreAllMocks.bind(moduleMocker);

export const clearAllMocks = moduleMocker.clearAllMocks.bind(moduleMocker);

export const isMockFunction = moduleMocker.isMockFunction.bind(moduleMocker);

export const reset = (hard?: boolean) => {
  quibble?.reset(hard);
};

/**
 * Mock a resolved specifier
 * @param specifier
 * @returns
 */
export async function mock<const MockedType extends Record<string, unknown> = any>(
  specifier: string,
  actual: Promise<MockedType>,
): Promise<Mocked<MockedType>>;
export async function mock<const MockedType extends Record<string, unknown> = any>(
  specifier: string,
  actual: MockedType,
): Promise<MockedType>;
export async function mock<const MockedType extends Record<string, unknown> = any>(
  specifier: string,
  actual: Promise<MockedType> | MockedType = import(specifier),
): Promise<Mocked<MockedType> | MockedType> {
  if (specifier.startsWith('.')) {
    // Resolve relative paths since quibble will resolve having this file as the caller
    specifier = new URL(specifier, resolveCallerUrl()).href;
  }

  let mockReturn: Mocked<MockedType> | MockedType | undefined;
  if ('then' in actual) {
    const metadata = moduleMocker.getMetadata<MockedType>(await actual)!;
    mockReturn = moduleMocker.generateFromMetadata(metadata);
  } else {
    mockReturn = actual;
  }

  const quibbleModule = await import('quibble');
  quibble = quibbleModule.default;
  quibble(specifier, mockReturn);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  await quibble.esm(specifier, mockReturn as any);
  return mockReturn;
}
