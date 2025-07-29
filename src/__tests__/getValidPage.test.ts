import getValidPage from '../utils/getValidPage';

function createParams(value: string | null): URLSearchParams {
  return new URLSearchParams(value ? { page: value } : {});
}

describe('getValidPage', () => {
  test('returns parsed page if valid integer >= 1', () => {
    expect(getValidPage(createParams('1'))).toBe(1);
    expect(getValidPage(createParams('99'))).toBe(99);
  });

  test('returns 1 for negative number or zero', () => {
    expect(getValidPage(createParams('-1'))).toBe(1);
    expect(getValidPage(createParams('0'))).toBe(1);
  });

  test('returns 1 for NaN-like input', () => {
    expect(getValidPage(createParams('NaN'))).toBe(1);
  });
});
