import DetailPanel from '../components/DetailPanel';
import Api from '../utils/Api';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSearchParams } from 'react-router-dom';
import type { Pokemon } from '../types/Pokemon';

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('../utils/Api', () => {
  return jest.fn().mockImplementation(() => ({
    getPokemon: jest.fn(),
  }));
});

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
    (Api as jest.Mock).mockImplementation(() => ({
      getPokemon: mockGetPokemon,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when no selectedItem', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(''),
      mockSetSearchParams,
    ]);

    const { container } = render(<DetailPanel />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render loading state with spinner text', () => {
    mockGetPokemon.mockImplementation(() => new Promise(() => {}));

    render(<DetailPanel />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render full UI of pokemon after fetch', async () => {
    mockGetPokemon.mockResolvedValue([mockPokemon]);

    render(<DetailPanel />);

    await waitFor(() => {
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
      expect(
        screen.getByText(mockPokemon.types.join(', '))
      ).toBeInTheDocument();
      expect(screen.getByText(/abilities/i)).toBeInTheDocument();
      expect(screen.getByText(mockPokemon.description)).toBeInTheDocument();
    });
  });

  it('should handle API errors gracefully', async () => {
    mockGetPokemon.mockRejectedValue(new Error('API Error'));

    render(<DetailPanel />);

    await waitFor(() => {
      expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
    });
  });

  it('should close the panel when Close button is clicked', async () => {
    mockGetPokemon.mockResolvedValue([mockPokemon]);

    render(<DetailPanel />);

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);

    const calledWith = mockSetSearchParams.mock.calls[0][0];
    expect(calledWith).toBeInstanceOf(URLSearchParams);
    expect(calledWith.get('details')).toBeNull();
  });
});
