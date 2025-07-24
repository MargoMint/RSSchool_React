import type { PokemonItem } from '../types/Pokemon';

export interface MainState {
  isLoading: boolean;
  error: string | null;
  results: PokemonItem[];
}
