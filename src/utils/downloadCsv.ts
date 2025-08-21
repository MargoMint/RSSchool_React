import type { Pokemon } from '../types/Pokemon';
import { getTranslations } from 'next-intl/server';

async function downloadCsv(pokemonList: Pokemon[], locale: string) {
  const t = await getTranslations({ locale, namespace: 'DetailPanel' });

  const fileHeaders = [
    t('name'),
    t('height'),
    t('weight'),
    t('types'),
    t('abilities'),
  ];

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
