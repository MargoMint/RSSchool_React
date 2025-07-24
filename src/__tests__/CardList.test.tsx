import CardList from '../components/CardList';
import type { Pokemon } from '../types/Pokemon';
import { render, screen } from '@testing-library/react';

describe('CardList', () => {
  const cardListItems: Pokemon[] = [
    {
      id: 1,
      name: 'bulbasaur',
      description: 'Abilities: overgrow, chlorophyll',
    },
    { id: 2, name: 'ivysaur', description: 'Abilities: overgrow, chlorophyll' },
    {
      id: 3,
      name: 'venusaur',
      description: 'Abilities: overgrow, chlorophyll',
    },
    { id: 4, name: 'charmander', description: 'Abilities: blaze, solar-power' },
    { id: 5, name: 'charmeleon', description: 'Abilities: blaze, solar-power' },
  ];

  test('renders correct number of items when data is provided', () => {
    render(<CardList cardItems={cardListItems} />);
    expect(screen.getAllByText(/Abilities:/i)).toHaveLength(5);
  });

  test('renders empty state when no items', () => {
    render(<CardList cardItems={[]} />);
    expect(screen.queryAllByText(/Abilities:/i).length).toBe(0);
  });
});
