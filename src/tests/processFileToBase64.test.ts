import { describe, expect } from 'vitest';
import processFileToBase64 from '../../src/utils/processFileToBase64';

const createMockFile = (
  content: string,
  filename = 'test.txt',
  type = 'text/plain'
): File => {
  const blob = new Blob([content], { type });
  return new File([blob], filename, { type });
};

describe('processFileToBase64', () => {
  test('must successfully convert the file to a Base64 string', async () => {
    const fileContent = 'Hello';
    const mockFile = createMockFile(fileContent);
    const expectedBase64 = `data:text/plain;base64,${btoa(fileContent)}`;
    const result = await processFileToBase64(mockFile);
    expect(result).toBe(expectedBase64);
  });

  test('must correctly process an empty file', async () => {
    const emptyFile = createMockFile('', 'empty.txt', 'text/plain');
    const result = await processFileToBase64(emptyFile);
    expect(result).toBeDefined();
    expect(result).toContain('data:text/plain;base64,');
  });
});
