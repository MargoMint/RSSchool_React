import CardList from '../components/CardList';
import type { CardListItem } from '../types/Card';
import { render, screen } from '@testing-library/react';

describe('CardList', () => {
  const cardListItems: CardListItem[] = [
    { name: 'bulbasaur', description: 'Abilities: overgrow, chlorophyll' },
    { name: 'ivysaur', description: 'Abilities: overgrow, chlorophyll' },
    { name: 'venusaur', description: 'Abilities: overgrow, chlorophyll' },
    { name: 'charmander', description: 'Abilities: blaze, solar-power' },
    { name: 'charmeleon', description: 'Abilities: blaze, solar-power' },
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
