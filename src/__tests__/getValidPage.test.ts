import getValidPage from '../utils/getValidPage';

function createParams(value: string | null): URLSearchParams {
  return new URLSearchParams(value ? { page: value } : {});
}

describe('getValidPage', () => {
  test('returns parsed page if valid integer', () => {
    expect(getValidPage(createParams('9'))).toBe(9);
  });

  test('returns 1 for decimal number', () => {
    expect(getValidPage(createParams('1.234'))).toBe(1);
  });

  test('returns 1 for negative number', () => {
    expect(getValidPage(createParams('-2'))).toBe(1);
  });

  test('returns 1 for null', () => {
    expect(getValidPage(createParams(null))).toBe(1);
  });
});
