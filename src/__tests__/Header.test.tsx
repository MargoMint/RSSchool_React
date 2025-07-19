import Header from '../components/Header';
import { render, screen } from '@testing-library/react';

describe('Header', () => {
  test('element renders without crashing', () => {
    render(<Header />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
