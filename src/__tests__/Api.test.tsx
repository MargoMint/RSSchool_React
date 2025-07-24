import Api from '../utils/Api';
import { POKEMON_ENDPOINT, POKEMON_LIST_QUERY } from '../constants/api';

global.fetch = jest.fn();

describe('Api class', () => {
  const api = new Api();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPokemon', () => {
    test('should return the Pokemon data upon successful request', async () => {
      const mockResponse = {
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
          name: 'bulbasaur',
          description: 'Abilities: overgrow, chlorophyll',
        },
      ]);
    });

    test('should throw error when pokemon not found', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(api.getPokemon('unknown')).rejects.toThrow(
        'Pokemon with name "unknown" not found'
      );
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
          name: 'bulbasaur',
          abilities: [{ ability: { name: 'overgrow' } }],
        },
        {
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
        `${POKEMON_ENDPOINT}/${POKEMON_LIST_QUERY}`
      );
      expect(result).toEqual([
        {
          name: 'bulbasaur',
          description: 'Abilities: overgrow',
        },
        {
          name: 'ivysaur',
          description: 'Abilities: chlorophyll',
        },
      ]);
    });

    test('should throw error when failed to fetch pokemon list', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(api.getAllPokemons()).rejects.toThrow(
        'Failed to fetch list of Pokemons'
      );
    });
  });
});
