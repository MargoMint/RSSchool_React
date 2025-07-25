import { mapPokemon } from '../utils/mapPokemon';

describe('mapPokemon', () => {
  test('should map raw API response to Pokemon object', () => {
    const raw = {
      id: 1,
      name: 'bulbasaur',
      abilities: [
        { ability: { name: 'overgrow' } },
        { ability: { name: 'chlorophyll' } },
      ],
    };

    expect(mapPokemon(raw)).toEqual({
      id: 1,
      name: 'bulbasaur',
      description: 'Abilities: overgrow, chlorophyll',
    });
  });

  test('should handle empty abilities array', () => {
    const raw = {
      id: 2,
      name: 'ivysaur',
      abilities: [],
    };
    expect(mapPokemon(raw)).toEqual({
      id: 2,
      name: 'ivysaur',
      description: 'Abilities: ',
    });
  });
});
