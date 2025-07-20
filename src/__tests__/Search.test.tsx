import Search from '../components/Search';
import { render, screen, fireEvent } from '@testing-library/react';
import { setupLocalStorageMock } from '../test-utils/clearMock';

describe('Search', () => {
  const mockOnSearch = jest.fn();

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

  test('calls onSearch and stores the trimmed value in localStorage', () => {
    render(<Search onSearch={mockOnSearch} />);
    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /Search/i });
    fireEvent.change(searchInput, { target: { value: '   bulbasaur   ' } });
    fireEvent.click(searchButton);
    expect(mockOnSearch).toHaveBeenCalledWith('bulbasaur');
    expect(localStorage.getItem('searchTerm')).toBe('bulbasaur');
  });

  test('triggers a search when pressing Enter', () => {
    render(<Search onSearch={mockOnSearch} />);
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'bulbasaur' } });
    fireEvent.keyPress(searchInput, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });
    expect(mockOnSearch).toHaveBeenCalledWith('bulbasaur');
    expect(localStorage.getItem('searchTerm')).toBe('bulbasaur');
  });

  test('updates input value when user types', () => {
    render(<Search onSearch={mockOnSearch} />);
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'bulbasaur' } });
    expect(searchInput).toHaveValue('bulbasaur');
  });
});
