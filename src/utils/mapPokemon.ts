import type { Pokemon } from '../types/Pokemon';
import { formatAbilities } from './formatAbilities';

interface RawPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
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
    image: data.sprites.front_default,
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    types: data.types.map((typeItem) => typeItem.type.name),
    description: `${formatAbilities(data.abilities)}`,
  };
}
