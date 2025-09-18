import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from '../components/Layout';

describe('Layout', () => {
  test('renders without crashing', () => {
    render(<Layout>Test content</Layout>);
    const contentElement = screen.getByText('Test content');
    expect(contentElement).toBeInTheDocument();
  });

  test('renders children correctly', () => {
    render(
      <Layout>
        <p>Children</p>
      </Layout>
    );
    const childElement = screen.getByText('Children');
    expect(childElement).toBeInTheDocument();
  });
});
