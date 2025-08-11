import Card from '../components/Card';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Card', () => {
  const mockClick = jest.fn();

  beforeEach(() => {
    mockClick.mockClear();
  });

  test('displays item name and description correctly', () => {
    render(
      <Card
        name="bulbasaur"
        description="overgrow, chlorophyll"
        onCardClick={mockClick}
      />
    );

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(
      screen.getByText('Abilities: overgrow, chlorophyll')
    ).toBeInTheDocument();
  });

  test('handles empty name and description gracefully', () => {
    render(<Card name="" description="" onCardClick={mockClick} />);
    expect(screen.queryByText(/./)).toBeNull();
  });

  test('calls onCardClick when clicked', async () => {
    const userActions = userEvent.setup();
    render(
      <Card
        name="bulbasaur"
        description="overgrow, chlorophyll"
        onCardClick={mockClick}
      />
    );

    await userActions.click(screen.getByTestId('card'));
    expect(mockClick).toHaveBeenCalledTimes(1);
    expect(mockClick).toHaveBeenCalledWith('bulbasaur');
  });
});
