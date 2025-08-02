import Main from '../components/Main';
import Api from '../api/Api';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupLocalStorageMock } from '../test-utils/clearMock';
import { MemoryRouter } from 'react-router-dom';
import { mapPokemon } from '../utils/mapPokemon';

jest.mock('../api/Api');

const mockGetAllPokemons = jest.fn();
const mockGetPokemon = jest.fn();

(Api as jest.Mock).mockImplementation(() => ({
  getAllPokemons: mockGetAllPokemons,
  getPokemon: mockGetPokemon,
}));

setupLocalStorageMock();

describe('Main', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  test('calls getAllPokemons on mount if no searchTerm in localStorage', async () => {
    mockGetAllPokemons.mockResolvedValueOnce([
      { name: 'bulbasaur', description: 'Abilities: overgrow, chlorophyll' },
    ]);
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
    expect(mockGetAllPokemons).toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    );
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  });

  test('uses the searchTerm from localStorage when loading', async () => {
    localStorage.setItem('searchTerm', JSON.stringify('bulbasaur'));
    mockGetPokemon.mockResolvedValueOnce([
      { name: 'bulbasaur', description: 'Abilities: overgrow, chlorophyll' },
    ]);
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
    expect(mockGetPokemon).toHaveBeenCalledWith('bulbasaur', mapPokemon);
    await waitFor(() =>
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    );
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  });

  test('shows loading indicator during fetch', async () => {
    let resolveFetch!: (value: unknown) => void;
    const promise = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    mockGetAllPokemons.mockReturnValueOnce(promise);
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    resolveFetch([
      { name: 'bulbasaur', description: 'Abilities: overgrow, chlorophyll' },
    ]);
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });
  });

  test('processes a successful response from the API', async () => {
    mockGetAllPokemons.mockResolvedValueOnce([
      { name: 'bulbasaur', description: 'Abilities: overgrow, chlorophyll' },
    ]);
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    );
  });

  test('displays an error when the API crashes', async () => {
    mockGetAllPokemons.mockRejectedValueOnce(new Error('API Error'));
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/API Error/i)).toBeInTheDocument();
    });
  });

  test('saves search term and fetches on search', async () => {
    mockGetAllPokemons.mockResolvedValueOnce([]);
    mockGetPokemon.mockResolvedValueOnce([
      { name: 'bulbasaur', description: 'Abilities: overgrow, chlorophyll' },
    ]);
    render(
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
    expect(mockGetPokemon).toHaveBeenCalledWith('bulbasaur', mapPokemon);
    await waitFor(() =>
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    );
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  });
});
