import App from '../App';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

describe('App', () => {
  test('renders Header and Outlet children', () => {
    render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="test" element={<div>Child Route Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /PokeSearch/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/child route content/i)).toBeInTheDocument();
  });
});
