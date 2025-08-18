import mockPokemon from '../test-utils/mockPokemon';
import type { Pokemon } from '../types/Pokemon';
import downloadCsv from '../utils/downloadCsv';

describe('downloadCsv', () => {
  test('should return CSV string with one pokemon', () => {
    const csv = downloadCsv([mockPokemon]);
    expect(csv).toContain('Name, Height, Weight, Types, Abilities');
    expect(csv).toContain('bulbasaur, 7, 69, grass, poison, overgrow');
  });

  test('sequence of CSV header names must be correct', () => {
    const csv = downloadCsv([mockPokemon]);
    const csvHeaders = csv.split('\n')[0];
    expect(csvHeaders).toBe('Name, Height, Weight, Types, Abilities');
  });

  test('should correctly display more than one pokemon in the list', () => {
    const anotherPokemon: Pokemon = {
      id: 2,
      name: 'ivysaur',
      description: 'overgrow, chlorophyll',
      image: 'https://example.com/ivysaur.png',
      height: 10,
      weight: 130,
      types: ['grass', 'poison'],
    };
    const csv = downloadCsv([mockPokemon, anotherPokemon]);
    const csvRows = csv.split('\n');
    expect(csvRows.length).toBe(3);
    expect(csvRows[1]).toContain('bulbasaur');
    expect(csvRows[2]).toContain('ivysaur');
  });
});
