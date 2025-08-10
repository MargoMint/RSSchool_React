import Main from '../components/Main';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupLocalStorageMock } from '../test-utils/clearMock';
import { MemoryRouter } from 'react-router-dom';
import renderDataWithProvider from '../test-utils/renderDataWithProvider';
import { useGetPokemonQuery, useGetAllPokemonsQuery } from '../api/pokemonApi';

jest.mock('../api/pokemonApi', () => ({
  useGetPokemonQuery: jest.fn(),
  useGetAllPokemonsQuery: jest.fn(),
}));

setupLocalStorageMock();

describe('Main', () => {
  const mockPokemonData = {
    name: 'bulbasaur',
    description: 'Abilities: overgrow, chlorophyll',
  };
  let refetchPokemon: jest.Mock;
  let refetchAll: jest.Mock;

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    refetchPokemon = jest.fn();
    refetchAll = jest.fn();

    (useGetPokemonQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: undefined,
      refetch: refetchPokemon,
    });

    (useGetAllPokemonsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: undefined,
      refetch: refetchAll,
    });
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders one pokemon when searchTerm in localStorage', async () => {
    localStorage.setItem('searchTerm', JSON.stringify('bulbasaur'));
    (useGetPokemonQuery as jest.Mock).mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      error: undefined,
      refetch: refetchPokemon,
    });
    renderDataWithProvider(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    );
    expect(useGetPokemonQuery).toHaveBeenCalledWith('bulbasaur', {
      skip: false,
    });
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  });

  test('shows loading indicator', async () => {
    (useGetAllPokemonsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
      refetch: refetchAll,
    });
    renderDataWithProvider(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test('displays an error when the API crashes', async () => {
    (useGetAllPokemonsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('API Error'),
      refetch: refetchAll,
    });
    renderDataWithProvider(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByText(/API Error/i)).toBeInTheDocument()
    );
  });

  test('saves search term and fetches on search', async () => {
    renderDataWithProvider(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
    const userActions = userEvent.setup();
    await userActions.type(screen.getByRole('textbox'), 'bulbasaur');
    await userActions.click(screen.getByRole('button', { name: /search/i }));
    expect(localStorage.getItem('searchTerm')).toBe(
      JSON.stringify('bulbasaur')
    );
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  });

  test('refresh button works as expected', async () => {
    (useGetAllPokemonsQuery as jest.Mock).mockReturnValue({
      data: [mockPokemonData],
      isLoading: false,
      error: undefined,
      refetch: refetchAll,
    });

    renderDataWithProvider(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole('button', { name: /Refresh/i }));
    expect(refetchAll).toHaveBeenCalledTimes(1);
  });
});
