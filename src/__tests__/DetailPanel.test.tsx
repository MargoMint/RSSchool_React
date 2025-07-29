import DetailPanel from '../components/DetailPanel';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Pokemon } from '../types/Pokemon';
import { useSearchParams, useOutletContext } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
  useOutletContext: jest.fn(),
}));

describe('DetailPanel', () => {
  const mockPokemon: Pokemon = {
    id: 1,
    name: 'bulbasaur',
    description: 'overgrow, chlorophyll',
    image: 'https://example.com/bulbasaur.png',
    height: 7,
    weight: 69,
    types: ['grass', 'poison'],
  };

  const mockSetSearchParams = jest.fn();
  let mockGetPokemon: jest.Mock;

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('?details=bulbasaur'),
      mockSetSearchParams,
    ]);

    mockGetPokemon = jest.fn();

    (useOutletContext as jest.Mock).mockReturnValue({
      api: { getPokemon: mockGetPokemon },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should not render when no selectedItem', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(''),
      mockSetSearchParams,
    ]);

    const { container } = render(<DetailPanel />);
    expect(container).toBeEmptyDOMElement();
  });

  test('should render loading state with spinner text', () => {
    mockGetPokemon.mockImplementation(() => new Promise(() => {}));

    render(<DetailPanel />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('should render full UI of pokemon after fetch', async () => {
    mockGetPokemon.mockResolvedValue(mockPokemon);

    render(<DetailPanel />);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /bulbasaur/i })
      ).toBeInTheDocument();
    });

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

  test('should handle API errors gracefully', async () => {
    mockGetPokemon.mockRejectedValue(new Error('API Error'));

    render(<DetailPanel />);

    await waitFor(() => {
      expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
    });
  });

  test('should close the panel when Close button is clicked', async () => {
    mockGetPokemon.mockResolvedValue(mockPokemon);

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
