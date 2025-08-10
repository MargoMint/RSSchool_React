import type { Pokemon } from '../types/Pokemon';

const mockPokemon: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  description: 'overgrow, chlorophyll',
  image: 'https://example.com/bulbasaur.png',
  height: 7,
  weight: 69,
  types: ['grass', 'poison'],
};

export default mockPokemon;
