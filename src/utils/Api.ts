import type { Pokemon } from '../types/Pokemon';
import { POKEMON_ENDPOINT, POKEMON_LIST_QUERY } from '../constants/api';
import { mapPokemon } from './mapPokemon';

class Api {
  async getPokemon(name: string): Promise<Pokemon[]> {
    const response = await fetch(`${POKEMON_ENDPOINT}/${name.toLowerCase()}`);
    if (!response.ok) throw new Error('Something went wrong');
    const data = await response.json();
    return [mapPokemon(data)];
  }

  async getAllPokemons(): Promise<Pokemon[]> {
    const response = await fetch(`${POKEMON_ENDPOINT}/${POKEMON_LIST_QUERY}`);
    if (!response.ok) throw new Error('Something went wrong');
    const data = await response.json();

    const detailedData = await Promise.all(
      data.results.map(async (item: { name: string; url: string }) => {
        const res = await fetch(item.url);
        const info = await res.json();
        return mapPokemon(info);
      })
    );
    return detailedData;
  }
}

export default Api;
