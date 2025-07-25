import Layout from '../components/Layout';
import { render, screen } from '@testing-library/react';

describe('Layout', () => {
  test('renders children correctly', () => {
    render(
      <Layout>
        <p>Test content</p>
      </Layout>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('renders correctly without children', () => {
    const { container } = render(<Layout>{undefined}</Layout>);
    expect(container.firstChild).toBeInTheDocument();
  });
});
