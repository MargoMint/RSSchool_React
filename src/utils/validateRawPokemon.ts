import type { RawPokemon } from '../types/Pokemon';

function isValidRawPokemon(data: unknown): data is RawPokemon {
  if (
    typeof (data as RawPokemon).id !== 'number' ||
    typeof (data as RawPokemon).name !== 'string' ||
    typeof data !== 'object' ||
    data === null ||
    !Array.isArray((data as RawPokemon).abilities) ||
    !(data as RawPokemon).abilities.every(
      (item) =>
        item &&
        typeof item === 'object' &&
        'ability' in item &&
        typeof item.ability?.name === 'string'
    )
  ) {
    return false;
  }

  return true;
}

export default isValidRawPokemon;
