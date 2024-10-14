import quibble from 'quibble';
import { ModuleMocker, type Mocked } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

export const resetAllMocks = moduleMocker.resetAllMocks.bind(moduleMocker);

export const fn = moduleMocker.fn.bind(moduleMocker);

export const spyOn = moduleMocker.spyOn.bind(moduleMocker);

export const restoreAllMocks = moduleMocker.restoreAllMocks.bind(moduleMocker);

export const clearAllMocks = moduleMocker.clearAllMocks.bind(moduleMocker);

export const isMockFunction = moduleMocker.isMockFunction.bind(moduleMocker);

export const reset = quibble.reset.bind(quibble);

/**
 * Mock a resolved specifier
 * @param specifier
 * @returns
 */
export async function mock<const MockedType = any>(
  specifier: string,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  actual: Promise<MockedType> = import(specifier),
): Promise<Mocked<MockedType>> {
  const metadata = moduleMocker.getMetadata<MockedType>(await actual)!;
  const mockReturn: Mocked<MockedType> | undefined = moduleMocker.generateFromMetadata(metadata);

  quibble(specifier, mockReturn);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  await quibble.esm(specifier, mockReturn as any);
  return mockReturn;
}
