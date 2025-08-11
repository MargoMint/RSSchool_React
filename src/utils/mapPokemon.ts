import type { Pokemon } from '../types/Pokemon';
import { formatAbilities } from './formatAbilities';
import isValidRawPokemon from './validateRawPokemon';

export function mapPokemon(data: unknown): Pokemon {
  if (!isValidRawPokemon(data)) {
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
