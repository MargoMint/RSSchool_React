import NotFoundPage from '../pages/NotFoundPage';
import { render, screen } from '@testing-library/react';

describe('NotFoundPage', () => {
  beforeEach(() => {
    render(<NotFoundPage />);
  });

  test('renders 404 message and info text', () => {
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/404/i);
    expect(screen.getByText(/no such page|oops/i)).toBeInTheDocument();
  });
});
