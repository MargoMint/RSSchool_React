import Card from '../components/Card';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockPokemon from '../test-utils/mockPokemon';

describe('Card', () => {
  const mockClick = jest.fn();
  const mockCheckboxChange = jest.fn();

  beforeEach(() => {
    mockClick.mockClear();
    mockCheckboxChange.mockClear();
  });

  const renderCard = (isSelected = false) =>
    render(
      <Card
        pokemon={mockPokemon}
        isSelected={isSelected}
        onCardClick={mockClick}
        onCheckboxChange={mockCheckboxChange}
      />
    );

  test('displays item name and description correctly', () => {
    renderCard();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(
      screen.getByText('Abilities: overgrow, chlorophyll')
    ).toBeInTheDocument();
  });

  test('calls onCardClick when clicked', async () => {
    const userActions = userEvent.setup();
    renderCard();

    await userActions.click(screen.getByTestId('card'));
    expect(mockClick).toHaveBeenCalledTimes(1);
    expect(mockClick).toHaveBeenCalledWith('bulbasaur');
  });

  test('toggles checkbox', async () => {
    const userActions = userEvent.setup();
    renderCard();

    await userActions.click(screen.getByRole('checkbox'));
    expect(mockCheckboxChange).toHaveBeenCalledTimes(1);
  });
});
