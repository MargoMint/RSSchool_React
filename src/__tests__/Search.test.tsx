import Search from '../components/Search';
import { render, screen } from '@testing-library/react';
import { setupLocalStorageMock } from '../test-utils/clearMock';
import userEvent from '@testing-library/user-event';

describe('Search', () => {
  const mockOnSearch = jest.fn();
  const userActions = userEvent.setup();

  setupLocalStorageMock();

  test('renders search input and search button', () => {
    render(<Search onSearch={mockOnSearch} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  test('displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('searchTerm', 'bulbasaur');
    render(<Search onSearch={mockOnSearch} />);
    expect(screen.getByRole('textbox')).toHaveValue('bulbasaur');
  });

  test('calls onSearch and stores the trimmed value in localStorage', async () => {
    render(<Search onSearch={mockOnSearch} />);
    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /Search/i });

    await userActions.clear(searchInput);
    await userActions.type(searchInput, '   bulbasaur   ');
    await userActions.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('bulbasaur');
    expect(localStorage.getItem('searchTerm')).toBe('bulbasaur');
  });

  test('triggers a search when pressing Enter', async () => {
    render(<Search onSearch={mockOnSearch} />);
    const searchInput = screen.getByRole('textbox');

    await userActions.clear(searchInput);
    await userActions.type(searchInput, 'bulbasaur');
    await userActions.keyboard('{Enter}');

    expect(mockOnSearch).toHaveBeenCalledWith('bulbasaur');
    expect(localStorage.getItem('searchTerm')).toBe('bulbasaur');
  });

  test('updates input value when user types', async () => {
    render(<Search onSearch={mockOnSearch} />);
    const searchInput = screen.getByRole('textbox');
    await userActions.type(searchInput, 'bulbasaur');
    expect(searchInput).toHaveValue('bulbasaur');
  });
});
