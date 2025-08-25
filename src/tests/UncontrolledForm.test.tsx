import { describe, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UncontrolledForm from '../components/Forms/UncontrolledForm';
import * as handleSubmitModule from '../utils/handleUncontrolledFormSubmit';

describe('UncontrolledForm', () => {
  const mockOnSubmit = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('renders all required fields', () => {
    render(<UncontrolledForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);
    expect(screen.getByLabelText(/^Name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Age$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Confirm Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Gender$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Country$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Picture$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Accept Terms/i)).toBeInTheDocument();
  });

  test('shows validation errors when form is invalid', async () => {
    const user = userEvent.setup();
    vi.spyOn(handleSubmitModule, 'default').mockResolvedValue({
      values: {},
      errors: { name: 'Name is required', email: 'Email is invalid' },
    });

    render(<UncontrolledForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Email is invalid')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('submits valid form data and closes', async () => {
    const user = userEvent.setup();
    const validValues = { name: 'Rita', email: 'rita@example.com' };

    vi.spyOn(handleSubmitModule, 'default').mockResolvedValue({
      values: validValues,
      errors: {},
    });

    render(<UncontrolledForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);

    await user.type(screen.getByLabelText(/name/i), 'Rita');
    await user.type(screen.getByLabelText(/email/i), 'rita@example.com');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith(validValues);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('clears errors after successful resubmit', async () => {
    const user = userEvent.setup();

    vi.spyOn(handleSubmitModule, 'default')
      .mockResolvedValueOnce({
        values: {},
        errors: { name: 'Name is required' },
      })
      .mockResolvedValueOnce({
        values: { name: 'Rita' },
        errors: {},
      });

    render(<UncontrolledForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);

    await user.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByText('Name is required')).toBeInTheDocument();

    await user.type(screen.getByLabelText(/name/i), 'Rita');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({ name: 'Rita' });
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
  });
});
