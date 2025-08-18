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

    getPokemonByUrl: builder.query<Pokemon, string>({
      query: (url) => ({ url }),
      transformResponse: (response: unknown) => mapPokemon(response),
      providesTags: (result) =>
        result ? [{ type: 'Pokemon', id: result.id }] : [],
    }),

    getAllPokemons: builder.query<
      { name: string; url: string }[],
      { offset: number; limit: number }
    >({
      query: ({ offset, limit }) => `?offset=${offset}&limit=${limit}`,
      transformResponse: (baseResponse: unknown) =>
        (baseResponse as PokemonListResponse).results,
      providesTags: ['Pokemon'],
    }),
  }),
});

export const {
  useGetPokemonQuery,
  useGetPokemonByUrlQuery,
  useGetAllPokemonsQuery,
} = pokemonApi;
