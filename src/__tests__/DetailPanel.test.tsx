import DetailPanel from '../components/DetailPanel';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockPokemon from '../test-utils/mockPokemon';
import { useSearchParams } from 'react-router-dom';
import { useGetPokemonQuery } from '../api/pokemonApi';
import useTheme from '../hooks/useTheme';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));

jest.mock('../api/pokemonApi', () => ({
  useGetPokemonQuery: jest.fn(),
}));

jest.mock('../hooks/useTheme', () => jest.fn());

describe('DetailPanel', () => {
  const mockSetSearchParams = jest.fn();

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('?details=bulbasaur'),
      mockSetSearchParams,
    ]);

    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should not render when no selectedItem', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(''),
      mockSetSearchParams,
    ]);

    (useGetPokemonQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    });

    const { container } = render(<DetailPanel />);
    expect(container).toBeEmptyDOMElement();
  });

  test('should render loading state with spinner text', () => {
    (useGetPokemonQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<DetailPanel />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('should render full UI of pokemon after fetch', () => {
    (useGetPokemonQuery as jest.Mock).mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      error: null,
    });

    render(<DetailPanel />);

    expect(
      screen.getByRole('heading', { name: /bulbasaur/i })
    ).toBeInTheDocument();

    expect(screen.getByAltText('bulbasaur')).toHaveAttribute(
      'src',
      mockPokemon.image
    );
    expect(screen.getByText(/height/i)).toBeInTheDocument();
    expect(screen.getByText(String(mockPokemon.height))).toBeInTheDocument();
    expect(screen.getByText(/weight/i)).toBeInTheDocument();
    expect(screen.getByText(String(mockPokemon.weight))).toBeInTheDocument();
    expect(screen.getByText(/types/i)).toBeInTheDocument();
    expect(screen.getByText(mockPokemon.types.join(', '))).toBeInTheDocument();
    expect(screen.getByText(/abilities/i)).toBeInTheDocument();
    expect(screen.getByText(mockPokemon.description)).toBeInTheDocument();
  });

  test('should handle API errors gracefully', () => {
    (useGetPokemonQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('API Error'),
    });

    render(<DetailPanel />);

    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
    expect(screen.getByText(/API Error/i)).toBeInTheDocument();
  });

  test('should close the panel when Close button is clicked', async () => {
    (useGetPokemonQuery as jest.Mock).mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      error: null,
    });

    render(<DetailPanel />);

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    const calledWith = mockSetSearchParams.mock.calls[0][0];
    expect(calledWith).toBeInstanceOf(URLSearchParams);
    expect(calledWith.get('details')).toBeNull();
  });
});
