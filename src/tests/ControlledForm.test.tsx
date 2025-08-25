import { describe, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ControlledForm from '../components/Forms/ControlledForm';

const mockOnSubmit = vi.fn();
const mockOnClose = vi.fn();

describe('ControlledForm', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnClose.mockClear();
  });

  test('renders all form fields and buttons', () => {
    render(<ControlledForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: /terms/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/picture/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    render(<ControlledForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);

    await userEvent.type(screen.getByLabelText(/name/i), 'Rita');
    await userEvent.type(screen.getByLabelText(/age/i), '23');
    await userEvent.type(screen.getByLabelText(/email/i), 'rita@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'Abc1!');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'Abc1!');
    await userEvent.selectOptions(screen.getByLabelText(/gender/i), 'female');
    await userEvent.type(screen.getByLabelText(/country/i), 'Poland');
    await userEvent.click(screen.getByRole('checkbox', { name: /terms/i }));

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const pictureInput = screen.getByLabelText(/picture/i) as HTMLInputElement;
    await userEvent.upload(pictureInput, file);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  test('calls onClose when Close button is clicked', async () => {
    render(<ControlledForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);
    await userEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
