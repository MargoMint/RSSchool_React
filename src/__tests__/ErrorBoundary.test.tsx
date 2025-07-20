import { ErrorBoundary } from '../components/ErrorBoundary';
import { render, screen } from '@testing-library/react';

const ErrorThrowingComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Test content</div>;
};

describe('ErrorBoundary', () => {
  test('renders child elements if there are no errors', () => {
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent shouldThrow={false} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('catches and handles errors and displays fallback UI', () => {
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Oops! Something went wrong/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });
});
