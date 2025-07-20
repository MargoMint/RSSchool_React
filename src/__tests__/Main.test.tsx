import Main from '../components/Main';
import Api from '../utils/Api';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupLocalStorageMock } from '../test-utils/clearMock';

jest.mock('../utils/Api');

const mockGetAllPokemons = jest.fn();
const mockGetPokemon = jest.fn();

(Api as jest.Mock).mockImplementation(() => ({
  getAllPokemons: mockGetAllPokemons,
  getPokemon: mockGetPokemon,
}));

setupLocalStorageMock();

describe('Main', () => {
  test('calls getAllPokemons on mount if no searchTerm in localStorage', async () => {
    mockGetAllPokemons.mockResolvedValueOnce([
      { name: 'bulbasaur', description: 'Abilities: overgrow, chlorophyll' },
    ]);
    render(<Main />);
    expect(mockGetAllPokemons).toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.getByText('BULBASAUR')).toBeInTheDocument()
    );
  });

  test('uses the searchTerm from localStorage when loading', async () => {
    localStorage.setItem('searchTerm', 'bulbasaur');
    mockGetPokemon.mockResolvedValueOnce([
      { name: 'bulbasaur', description: 'Abilities: overgrow, chlorophyll' },
    ]);
    render(<Main />);
    expect(mockGetPokemon).toHaveBeenCalledWith('bulbasaur');
    await waitFor(() =>
      expect(screen.getByText('BULBASAUR')).toBeInTheDocument()
    );
  });

  test('shows loading indicator during fetch', async () => {
    let resolveFetch!: (value: unknown) => void;
    const promise = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    mockGetAllPokemons.mockReturnValueOnce(promise);
    render(<Main />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    resolveFetch([
      { name: 'bulbasaur', description: 'Abilities: overgrow, chlorophyll' },
    ]);
    await waitFor(() =>
      expect(screen.getByText('BULBASAUR')).toBeInTheDocument()
    );
  });

  test('processes a successful response from the API', async () => {
    mockGetAllPokemons.mockResolvedValueOnce([
      { name: 'bulbasaur', description: 'Abilities: overgrow, chlorophyll' },
    ]);
    render(<Main />);
    await waitFor(() =>
      expect(screen.getByText('BULBASAUR')).toBeInTheDocument()
    );
  });

  test('displays an error when the API crashes', async () => {
    mockGetAllPokemons.mockRejectedValueOnce(new Error('API Error'));
    render(<Main />);
    await waitFor(() => {
      expect(screen.getByText(/API Error/i)).toBeInTheDocument();
    });
  });

  test('saves search term and fetches on search', async () => {
    mockGetAllPokemons.mockResolvedValueOnce([]);
    mockGetPokemon.mockResolvedValueOnce([
      { name: 'bulbasaur', description: 'Abilities: overgrow, chlorophyll' },
    ]);
    render(<Main />);
    const userActions = userEvent.setup();
    await userActions.type(screen.getByRole('textbox'), 'bulbasaur');
    await userActions.click(screen.getByRole('button', { name: /search/i }));
    expect(localStorage.getItem('searchTerm')).toBe('bulbasaur');
    expect(mockGetPokemon).toHaveBeenCalledWith('bulbasaur');
    await waitFor(() =>
      expect(screen.getByText('BULBASAUR')).toBeInTheDocument()
    );
  });

  test('shows fallback UI when "Throw Error" button is clicked', async () => {
    mockGetAllPokemons.mockResolvedValueOnce([]);
    render(<Main />);
    const userActions = userEvent.setup();
    const throwButton = screen.getByRole('button', { name: /Throw error/i });
    await userActions.click(throwButton);
    expect(
      await screen.findByText(/Oops! something went wrong/i)
    ).toBeInTheDocument();
  });
});
