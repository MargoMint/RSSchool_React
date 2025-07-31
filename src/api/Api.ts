import { POKEMON_ENDPOINT } from '../constants/api';

class Api {
  async getPokemon<T>(name: string, mapData: (data: unknown) => T): Promise<T> {
    const response = await fetch(`${POKEMON_ENDPOINT}/${name.toLowerCase()}`);
    if (!response.ok) throw new Error('Something went wrong');
    const data = await response.json();
    return mapData(data);
  }

  async getAllPokemons<T>(
    offset = 0,
    limit = 10,
    mapData: (data: unknown) => T
  ): Promise<T[]> {
    const response = await fetch(
      `${POKEMON_ENDPOINT}?offset=${offset}&limit=${limit}`
    );
    if (!response.ok) throw new Error('Something went wrong');
    const data = await response.json();

    const detailedData = await Promise.all(
      data.results.map(async (item: { name: string; url: string }) => {
        const res = await fetch(item.url);
        const info = await res.json();
        return mapData(info);
      })
    );
    return detailedData;
  }
}

export default Api;
