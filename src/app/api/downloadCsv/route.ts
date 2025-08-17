import { NextResponse, NextRequest } from 'next/server';
import downloadCsv from '../../../utils/downloadCsv';
import { POKEMON_ENDPOINT } from '../../../constants/api';
import mapPokemon from '../../../utils/mapPokemon';
import type { Pokemon } from '../../../types/Pokemon';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const names = searchParams.get('names');

  if (!names) return NextResponse.json({ error: 'Error' }, { status: 400 });

  const selectedNames = names.split(',');

  try {
    const pokemons: Pokemon[] = [];
    for (const name of selectedNames) {
      const response = await fetch(`${POKEMON_ENDPOINT}/${name}`);
      const data = await response.json();
      pokemons.push(mapPokemon(data));
    }

    if (pokemons.length === 0) {
      return NextResponse.json({ error: 'Error' }, { status: 404 });
    }

    const csv = downloadCsv(pokemons);

    const fileName = `${pokemons.length}_items.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
