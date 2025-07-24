import ErrorBoundary from '../components/ErrorBoundary';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const ErrorThrowingComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Test content</div>;
};

describe('ErrorBoundary', () => {
  const userActions = userEvent.setup();

  test('renders child elements if there are no errors', () => {
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent shouldThrow={false} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('catches and handles errors and displays fallback UI', async () => {
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

    const tryAgainButton = screen.getByRole('button', { name: /Try again/i });
    await userActions.click(tryAgainButton);
  });
});
