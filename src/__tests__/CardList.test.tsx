import CardList from '../components/CardList';
import type { BasicPokemon } from '../types/Pokemon';
import { screen } from '@testing-library/react';
import renderDataWithProvider from '../test-utils/renderDataWithProvider';

jest.mock('../api/pokemonApi', () => ({
  useGetPokemonByUrlQuery: jest.fn(() => ({
    data: {},
    isLoading: false,
    error: null,
  })),
}));

describe('CardList', () => {
  const mockClick = jest.fn();

  const cardListItems: BasicPokemon[] = [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ];

  test('renders correct number of Card components', () => {
    renderDataWithProvider(
      <CardList cardItems={cardListItems} onCardClick={mockClick} />
    );
    expect(screen.getAllByTestId('card')).toHaveLength(2);
  });

  test('renders empty state when no items', () => {
    renderDataWithProvider(<CardList cardItems={[]} onCardClick={mockClick} />);
    expect(screen.queryAllByTestId('card').length).toBe(0);
  });
});
