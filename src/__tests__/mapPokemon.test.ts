import { mapPokemon } from '../utils/mapPokemon';

describe('mapPokemon', () => {
  test('should map raw API response to Pokemon object', () => {
    const raw = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
      abilities: [
        { ability: { name: 'overgrow' } },
        { ability: { name: 'chlorophyll' } },
      ],
      sprites: {
        front_default: 'https://example.com/bulbasaur.png',
      },
    };

    expect(mapPokemon(raw)).toEqual({
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      types: ['grass', 'poison'],
      image: 'https://example.com/bulbasaur.png',
      description: 'overgrow, chlorophyll',
    });
  });

  test('should handle empty abilities array', () => {
    const raw = {
      id: 2,
      name: 'ivysaur',
      height: 10,
      weight: 130,
      types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
      abilities: [],
      sprites: {
        front_default: 'https://example.com/ivysaur.png',
      },
    };

    expect(mapPokemon(raw)).toEqual({
      id: 2,
      name: 'ivysaur',
      height: 10,
      weight: 130,
      types: ['grass', 'poison'],
      image: 'https://example.com/ivysaur.png',
      description: '',
    });
  });
});
