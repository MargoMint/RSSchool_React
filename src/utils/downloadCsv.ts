import type { Pokemon } from '../types/Pokemon';

function downloadCsv(pokemonList: Pokemon[]) {
  const fileHeaders = ['Name', 'Height', 'Weight', 'Types', 'Abilities'];

  const fileData = pokemonList.map((pokemon) => [
    pokemon.name,
    pokemon.height,
    pokemon.weight,
    pokemon.types.join(', '),
    pokemon.description,
  ]);

  const fileDataRows = [fileHeaders, ...fileData].map((data) =>
    data.map((value) => value.toString()).join(', ')
  );

  return fileDataRows.join('\n');
}

export default downloadCsv;
