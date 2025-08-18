import type { BasicPokemon } from '../types/Pokemon';

export interface MainState {
  isLoading: boolean;
  error: string | null;
  results: BasicPokemon[];
}
