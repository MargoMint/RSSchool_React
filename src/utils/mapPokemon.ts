import type { Pokemon } from '../types/Pokemon';
import { formatAbilities } from './formatAbilities';

interface RawPokemon {
  id: number;
  name: string;
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

export function mapPokemon(data: RawPokemon): Pokemon {
  if (
    typeof data.id !== 'number' ||
    typeof data.name !== 'string' ||
    !Array.isArray(data.abilities) ||
    !data.abilities.every(
      (item) => item && item.ability && typeof item.ability.name === 'string'
    )
  ) {
    throw new Error('Invalid Pokemon data');
  }

  return {
    id: data.id,
    name: data.name,
    description: `Abilities: ${formatAbilities(data.abilities)}`,
  };
}
