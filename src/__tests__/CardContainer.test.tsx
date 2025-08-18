import CardContainer from '../components/CardContainer';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockPokemon from '../test-utils/mockPokemon';
import renderDataWithProvider from '../test-utils/renderDataWithProvider';

describe('CardContainer', () => {
  const mockClick = jest.fn();

  beforeEach(() => {
    mockClick.mockClear();
  });

  test('renders Card component with correct props', () => {
    renderDataWithProvider(
      <CardContainer pokemon={mockPokemon} onCardClick={mockClick} />
    );
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  test('handles checkbox toggle and updates store', async () => {
    const userActions = userEvent.setup();
    renderDataWithProvider(
      <CardContainer pokemon={mockPokemon} onCardClick={mockClick} />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await userActions.click(checkbox);
    expect(checkbox).toBeChecked();

    await userActions.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test('passes card click handler to Card component', async () => {
    const userActions = userEvent.setup();
    renderDataWithProvider(
      <CardContainer pokemon={mockPokemon} onCardClick={mockClick} />
    );

    await userActions.click(screen.getByTestId('card'));
    expect(mockClick).toHaveBeenCalledWith('bulbasaur');
  });
});
