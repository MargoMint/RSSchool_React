import Card from '../components/Card';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonReducer from '../store/selectedSlice';
import type { Pokemon } from '../types/Pokemon';

describe('Card', () => {
  const mockClick = jest.fn();

  beforeEach(() => {
    mockClick.mockClear();
  });

  const pokemonStore = configureStore({
    reducer: { selectedPokemon: selectedPokemonReducer },
  });

  const bulbasaur: Pokemon = {
    id: 1,
    name: 'bulbasaur',
    description: 'overgrow, chlorophyll',
    height: 7,
    weight: 69,
    types: ['grass', 'poison'],
    image: 'https://example.com/bulbasaur.png',
  };

  const emptyPokemon: Pokemon = {
    id: 2,
    name: '',
    description: '',
    height: 0,
    weight: 0,
    types: [],
    image: '',
  };

  const renderPokemonWithProvider = (
    pokemon: Pokemon,
    onCardClick = mockClick
  ) =>
    render(
      <Provider store={pokemonStore}>
        <Card pokemon={pokemon} onCardClick={onCardClick} />
      </Provider>
    );

  test('displays item name and description correctly', () => {
    renderPokemonWithProvider(bulbasaur);

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(
      screen.getByText('Abilities: overgrow, chlorophyll')
    ).toBeInTheDocument();
  });

  test('handles empty name and description gracefully', () => {
    renderPokemonWithProvider(emptyPokemon);
    expect(screen.queryByText(/./)).toBeNull();
  });

  test('calls onCardClick when clicked', async () => {
    const userActions = userEvent.setup();
    renderPokemonWithProvider(bulbasaur, mockClick);

    await userActions.click(screen.getByTestId('card'));
    expect(mockClick).toHaveBeenCalledTimes(1);
    expect(mockClick).toHaveBeenCalledWith('bulbasaur');
  });

  test('toggles checkbox', async () => {
    const userActions = userEvent.setup();
    renderPokemonWithProvider(bulbasaur);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await userActions.click(checkbox);
    expect(checkbox).toBeChecked();

    await userActions.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
