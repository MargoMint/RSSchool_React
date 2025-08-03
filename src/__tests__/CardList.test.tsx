import CardList from '../components/CardList';
import type { Pokemon } from '../types/Pokemon';
import { screen } from '@testing-library/react';
import renderDataWithProvider from '../test-utils/renderDataWithProvider';

describe('CardList', () => {
  const mockClick = jest.fn();

  const cardListItems: Pokemon[] = [
    {
      id: 1,
      name: 'bulbasaur',
      description: 'Abilities: overgrow, chlorophyll',
      image: 'https://example.com/bulbasaur.png',
      height: 7,
      weight: 69,
      types: ['grass', 'poison'],
    },
    {
      id: 2,
      name: 'ivysaur',
      description: 'Abilities: overgrow, chlorophyll',
      image: 'https://example.com/ivysaur.png',
      height: 10,
      weight: 130,
      types: ['grass', 'poison'],
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
