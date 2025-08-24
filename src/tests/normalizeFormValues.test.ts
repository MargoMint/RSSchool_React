import { describe, expect, vi, beforeEach } from 'vitest';
import normalizeFormValues from '../utils/normalizeFormValues';

describe('normalizeFormValues', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('trims string fields and sets default values', async () => {
    const input = {
      name: '  Rita  ',
      age: '23',
      email: '  rita@example.com ',
      password: ' Abc1! ',
      gender: ' Female ',
      country: ' Poland ',
      acceptTermsAndCondition: 'true',
      confirmPassword: '123',
    };

    const result = await normalizeFormValues(input);

    expect(result).toEqual({
      name: 'Rita',
      age: 23,
      email: 'rita@example.com',
      password: 'Abc1!',
      gender: 'Female',
      country: 'Poland',
      acceptTermsAndCondition: true,
      picture: undefined,
    });
  });

  test('converts age to number and defaults to 0 for invalid', async () => {
    const input = { age: 'abc' };
    const result = await normalizeFormValues(input);
    expect(result.age).toBe(0);

    const input2 = { age: 30 };
    const result2 = await normalizeFormValues(input2);
    expect(result2.age).toBe(30);
  });

  test('normalizes acceptTermsAndCondition correctly', async () => {
    const values = ['true', 'on', '1', true, false, 'false'];
    const expected = [true, true, true, true, false, false];

    for (let i = 0; i < values.length; i++) {
      const res = await normalizeFormValues({
        acceptTermsAndCondition: values[i],
      });
      expect(res.acceptTermsAndCondition).toBe(expected[i]);
    }
  });

  test('removes confirmPassword field', async () => {
    const input = { confirmPassword: 'abc123', password: 'pwd' };
    const result = await normalizeFormValues(input);
    expect(result).not.toHaveProperty('confirmPassword');
    expect(result.password).toBe('pwd');
  });

  test('handles picture as string', async () => {
    const input = { picture: 'image.png' };
    const result = await normalizeFormValues(input);
    expect(result.picture).toBe('image.png');
  });

  test('defaults missing fields to empty string or 0', async () => {
    const result = await normalizeFormValues({});
    expect(result).toEqual({
      name: '',
      age: 0,
      email: '',
      password: '',
      gender: '',
      country: '',
      acceptTermsAndCondition: false,
      picture: undefined,
    });
  });
});
