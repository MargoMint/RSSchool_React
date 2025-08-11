import type { Pokemon } from '../types/Pokemon';

export interface MainState {
  isLoading: boolean;
  error: string | null;
  results: Pokemon[];
}
