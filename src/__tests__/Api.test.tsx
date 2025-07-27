import Api from '../utils/Api';
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
        abilities: [
          { ability: { name: 'overgrow' } },
          { ability: { name: 'chlorophyll' } },
        ],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await api.getPokemon('bulbasaur');

      expect(fetch).toHaveBeenCalledWith(`${POKEMON_ENDPOINT}/bulbasaur`);
      expect(result).toEqual([
        {
          id: 1,
          name: 'bulbasaur',
          description: 'Abilities: overgrow, chlorophyll',
        },
      ]);
    });

    test('should throw error when pokemon not found', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(api.getPokemon('unknown')).rejects.toThrow(
        'Something went wrong'
      );
    });

    test('should throw if response is missing abilities', async () => {
      const malformedResponse = {
        id: 1,
        name: 'bulbasaur',
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => malformedResponse,
      });
      await expect(api.getPokemon('bulbasaur')).rejects.toThrow();
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
          abilities: [{ ability: { name: 'overgrow' } }],
        },
        {
          id: 2,
          name: 'ivysaur',
          abilities: [{ ability: { name: 'chlorophyll' } }],
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

      const result = await api.getAllPokemons();

      expect(fetch).toHaveBeenCalledWith(
        `${POKEMON_ENDPOINT}?offset=0&limit=10`
      );
      expect(result).toEqual([
        {
          id: 1,
          name: 'bulbasaur',
          description: 'Abilities: overgrow',
        },
        {
          id: 2,
          name: 'ivysaur',
          description: 'Abilities: chlorophyll',
        },
      ]);
    });

    test('should throw error when failed to fetch pokemon list', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
      await expect(api.getAllPokemons()).rejects.toThrow(
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
      await expect(api.getAllPokemons()).rejects.toThrow();
    });

    test('should throw if ability.name is missing', async () => {
      const invalidResponse = {
        id: 1,
        name: 'bulbasaur',
        abilities: [{ ability: {} }],
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => invalidResponse,
      });
      await expect(api.getPokemon('bulbasaur')).rejects.toThrow();
    });

    test('should throw if id is not a number', async () => {
      const invalidResponse = {
        id: 'NaN',
        name: 'bulbasaur',
        abilities: [{ ability: { name: 'overgrow' } }],
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => invalidResponse,
      });
      await expect(api.getPokemon('bulbasaur')).rejects.toThrow();
    });
  });
});
