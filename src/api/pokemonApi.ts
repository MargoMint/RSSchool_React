import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Pokemon } from '../types/Pokemon';
import { POKEMON_ENDPOINT } from '../constants/api';
import mapPokemon from '../utils/mapPokemon';

interface PokemonListResponse {
  results: { name: string; url: string }[];
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: POKEMON_ENDPOINT }),
  tagTypes: ['Pokemon'],
  endpoints: (builder) => ({
    getPokemon: builder.query<Pokemon, string>({
      query: (name) => `/${name.toLowerCase()}`,
      transformResponse: (response: unknown) => mapPokemon(response),
      providesTags: (result) =>
        result ? [{ type: 'Pokemon', id: result.id }] : [],
    }),

    getAllPokemons: builder.query<Pokemon[], { offset: number; limit: number }>(
      {
        query: ({ offset, limit }) => `?offset=${offset}&limit=${limit}`,
        async transformResponse(baseResponse: unknown) {
          const { results } = baseResponse as PokemonListResponse;

          const detailedData = await Promise.all(
            results.map(async (item: { name: string; url: string }) => {
              const res = await fetch(item.url);
              const info = await res.json();
              return mapPokemon(info);
            })
          );
          return detailedData;
        },
        providesTags: ['Pokemon'],
      }
    ),
  }),
});

export const { useGetPokemonQuery, useGetAllPokemonsQuery } = pokemonApi;
