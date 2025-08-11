import { formatAbilities } from '../utils/formatAbilities';

describe('formatAbilities', () => {
  test('should return a comma-separated list of ability names', () => {
    const abilities = [
      { ability: { name: 'overgrow' } },
      { ability: { name: 'chlorophyll' } },
    ];
    expect(formatAbilities(abilities)).toBe('overgrow, chlorophyll');
  });

  test('should return an empty string if abilities is an empty array', () => {
    expect(formatAbilities([])).toBe('');
  });
});
