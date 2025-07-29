import Api from '../api/Api';
import { mapPokemon } from '../utils/mapPokemon';
import { POKEMON_ENDPOINT } from '../constants/api';

global.fetch = jest.fn();

describe('Api class', () => {
  const api = new Api();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPokemon', () => {
    test('should return the Pokemon data upon successful request', async () => {
      const mockResponse = {
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

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await api.getPokemon('bulbasaur', mapPokemon);

      expect(fetch).toHaveBeenCalledWith(`${POKEMON_ENDPOINT}/bulbasaur`);
      expect(result).toEqual({
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        types: ['grass', 'poison'],
        description: 'overgrow, chlorophyll',
        image: 'https://example.com/bulbasaur.png',
      });
    });

    test('should throw error when pokemon not found', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(api.getPokemon('unknown', mapPokemon)).rejects.toThrow(
        'Something went wrong'
      );
    });

    test('should throw if response is missing abilities', async () => {
      const malformedResponse = {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        types: [{ type: { name: 'grass' } }],
        sprites: {
          front_default: 'https://example.com/bulbasaur.png',
        },
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => malformedResponse,
      });
      await expect(api.getPokemon('bulbasaur', mapPokemon)).rejects.toThrow();
    });

    test('should throw if ability.name is missing', async () => {
      const invalidResponse = {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        types: [{ type: { name: 'grass' } }],
        abilities: [{ ability: {} }],
        sprites: {
          front_default: 'https://example.com/bulbasaur.png',
        },
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => invalidResponse,
      });
      await expect(api.getPokemon('bulbasaur', mapPokemon)).rejects.toThrow();
    });

    test('should throw if id is not a number', async () => {
      const invalidResponse = {
        id: 'NaN',
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        types: [{ type: { name: 'grass' } }],
        abilities: [{ ability: { name: 'overgrow' } }],
        sprites: {
          front_default: 'https://example.com/bulbasaur.png',
        },
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => invalidResponse,
      });
      await expect(api.getPokemon('bulbasaur', mapPokemon)).rejects.toThrow();
    });
  });

  describe('getAllPokemons', () => {
    test('should return formatted list of pokemons', async () => {
      const listResponse = {
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      };

      const detailResponses = [
        {
          id: 1,
          name: 'bulbasaur',
          height: 7,
          weight: 69,
          types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
          abilities: [{ ability: { name: 'overgrow' } }],
          sprites: {
            front_default: 'https://example.com/bulbasaur.png',
          },
        },
        {
          id: 2,
          name: 'ivysaur',
          height: 10,
          weight: 130,
          types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
          abilities: [{ ability: { name: 'chlorophyll' } }],
          sprites: {
            front_default: 'https://example.com/ivysaur.png',
          },
        },
      ];

      (fetch as jest.Mock)
        .mockResolvedValueOnce({ ok: true, json: async () => listResponse })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => detailResponses[0],
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => detailResponses[1],
        });

      const result = await api.getAllPokemons(0, 10, mapPokemon);

      expect(fetch).toHaveBeenCalledWith(
        `${POKEMON_ENDPOINT}?offset=0&limit=10`
      );
      expect(result).toEqual([
        {
          id: 1,
          name: 'bulbasaur',
          height: 7,
          weight: 69,
          types: ['grass', 'poison'],
          description: 'overgrow',
          image: 'https://example.com/bulbasaur.png',
        },
        {
          id: 2,
          name: 'ivysaur',
          height: 10,
          weight: 130,
          types: ['grass', 'poison'],
          description: 'chlorophyll',
          image: 'https://example.com/ivysaur.png',
        },
      ]);
    });

    test('should throw error when failed to fetch pokemon list', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
      await expect(api.getAllPokemons(0, 10, mapPokemon)).rejects.toThrow(
        'Something went wrong'
      );
    });

    test('should throw if results is not an array', async () => {
      const malformedListResponse = {
        results: null,
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => malformedListResponse,
      });
      await expect(api.getAllPokemons(0, 10, mapPokemon)).rejects.toThrow();
    });
  });
});
