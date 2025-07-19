import type { PokemonItem } from '../types/Pokemon';

export interface MainState {
  shouldThrow: boolean;
  isLoading: boolean;
  error: string | null;
  results: PokemonItem[];
}
