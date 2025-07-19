import Card from '../components/Card';
import { render, screen } from '@testing-library/react';

describe('Card', () => {
  test('displays item name and description correctly', () => {
    render(
      <Card name="bulbasaur" description="Abilities: overgrow, chlorophyll" />
    );
    expect(screen.getByText('BULBASAUR')).toBeInTheDocument();
    expect(
      screen.getByText('Abilities: overgrow, chlorophyll')
    ).toBeInTheDocument();
  });

  test('handles empty name and description gracefully', () => {
    render(<Card name="" description="" />);
    expect(
      screen.getAllByRole('paragraph')[0] || screen.getByText('')
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('paragraph')[1] || screen.getByText('')
    ).toBeInTheDocument();
  });
});
