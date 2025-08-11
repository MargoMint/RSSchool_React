import React, { Component, type PropsWithChildren } from 'react';
import Button from './Button';

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface ErrorBoundaryProps {
  onReset?: () => void;
}

class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren<ErrorBoundaryProps>) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center">
          <h1 className="text-5xl uppercase text-red-800">
            Oops! Something went wrong
          </h1>
          <h2 className="text-lg mb-2">{this.state.error?.message}</h2>
          <Button
            onClick={this.handleReset}
            title="Try again"
            variant="primary"
          />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
