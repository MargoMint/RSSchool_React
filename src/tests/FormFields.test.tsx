import { describe, expect } from 'vitest';
import FormFields from '../components/Forms/FormFields';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('FormFields Component', () => {
  const mockRegister = (name: string) => ({ 'data-testid': name, name });

  test('renders all form fields', () => {
    render(<FormFields errors={{}} register={mockRegister} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Picture')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Accept Terms & Conditions')
    ).toBeInTheDocument();
  });

  test('displays error messages when provided', () => {
    const errors = {
      name: 'Name is required',
      email: 'Email is invalid',
    };

    render(<FormFields errors={errors} register={mockRegister} />);

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is invalid')).toBeInTheDocument();
  });

  test('allows typing in text fields', async () => {
    render(<FormFields errors={{}} register={mockRegister} />);
    const userAction = userEvent.setup();

    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
    await userAction.type(nameInput, 'Rita Match');
    expect(nameInput.value).toBe('Rita Match');

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    await userAction.type(emailInput, 'rita@example.com');
    expect(emailInput.value).toBe('rita@example.com');
  });

  test('allows selecting a gender', async () => {
    render(<FormFields errors={{}} register={mockRegister} />);
    const userAction = userEvent.setup();

    const genderSelect = screen.getByLabelText('Gender') as HTMLSelectElement;
    await userAction.selectOptions(genderSelect, 'female');
    expect(genderSelect.value).toBe('female');
  });

  test('allows checking the accept terms checkbox', async () => {
    render(<FormFields errors={{}} register={mockRegister} />);
    const userAction = userEvent.setup();

    const checkbox = screen.getByLabelText(
      'Accept Terms & Conditions'
    ) as HTMLInputElement;
    await userAction.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
});
