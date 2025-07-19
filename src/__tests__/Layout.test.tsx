import { Layout } from '../components/Layout';
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

  test('works as expected even when there are no children', () => {
    const { container } = render(<Layout>{undefined}</Layout>);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('works as expected even when the children are null', () => {
    const { container } = render(<Layout>{null}</Layout>);
    expect(container.firstChild).toBeInTheDocument();
  });
});
