import type { Pokemon } from '../types/Pokemon';
import { POKEMON_ENDPOINT, POKEMON_LIST_QUERY } from '../constants/api';

interface Abilities {
  ability: {
    name: string;
  };
}

class Api {
  private formatAbilities(abilities: Abilities[]): string {
    return abilities.map((abilityItem) => abilityItem.ability.name).join(', ');
  }

  async getPokemon(name: string): Promise<Pokemon[]> {
    const response = await fetch(`${POKEMON_ENDPOINT}/${name.toLowerCase()}`);
    if (!response.ok) throw new Error(`Pokemon with name "${name}" not found`);
    const data = await response.json();
    return [
      {
        id: data.id,
        name: data.name,
        description: `Abilities: ${this.formatAbilities(data.abilities)}`,
      },
    ];
  }

  async getAllPokemons(): Promise<Pokemon[]> {
    const response = await fetch(`${POKEMON_ENDPOINT}/${POKEMON_LIST_QUERY}`);
    if (!response.ok) throw new Error('Failed to fetch list of Pokemons');
    const data = await response.json();
    const detailedData = await Promise.all(
      data.results.map(async (item: { name: string; url: string }) => {
        const res = await fetch(item.url);
        const info = await res.json();
        return {
          id: info.id,
          name: info.name,
          description: `Abilities: ${this.formatAbilities(info.abilities)}`,
        };
      })
    );
    return detailedData;
  }
}

export default Api;
