import AboutPage from '../pages/About';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

describe('AboutPage', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );
  });

  test('renders header and layout components content', () => {
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();

    const rsSchoolLink = screen.getByRole('link', { name: /Rs school/i });
    expect(rsSchoolLink).toHaveAttribute(
      'href',
      expect.stringContaining('rs.school')
    );

    const authorLink = screen.getByRole('link', { name: /Author/i });
    expect(authorLink).toHaveAttribute(
      'href',
      expect.stringContaining('github.com')
    );

    const backButton = screen.getByRole('button', { name: /Back to home/i });
    expect(backButton).toBeInTheDocument();
  });

  test('Back to Home button is rendered and clickable', async () => {
    const userActions = userEvent.setup();
    const backButton = screen.getByRole('button', { name: /Back to home/i });

    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('a')).toHaveAttribute('href', '/');

    await userActions.click(backButton);
  });
});
