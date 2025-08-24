import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MainPage } from '../pages/MainPage';
import * as hooks from '../store/hooks';
import type { StoredFormData } from '../components/Forms/FormTypes';

beforeEach(() => {
  const portal = document.createElement('div');
  portal.setAttribute('id', 'portal');
  document.body.appendChild(portal);
});

afterEach(() => {
  const portal = document.getElementById('portal');
  if (portal) portal.remove();
});

const mockSubmissions: StoredFormData[] = [
  {
    name: 'Rita Match',
    age: 23,
    email: 'rita@example.com',
    country: 'Poland',
    gender: 'Female',
    picture: 'rita.png',
    password: 'Abc1!',
    acceptTermsAndCondition: true,
  },
  {
    name: 'Eva Smith',
    age: 25,
    email: 'eva@example.com',
    country: 'USA',
    gender: 'Female',
    picture: 'eva.png',
    password: 'Xyz789!',
    acceptTermsAndCondition: true,
  },
];

vi.spyOn(hooks, 'useAppSelector').mockImplementation((selector) => {
  if (selector.name === 'selectSubmissions') return mockSubmissions;
  return [];
});

describe('MainPage', () => {
  it('renders buttons', () => {
    render(<MainPage />);
    expect(
      screen.getByRole('button', { name: /Open Uncontrolled Form/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Open Controlled Form/i })
    ).toBeInTheDocument();
  });

  it('renders submissions as ListItemOfForm components', () => {
    render(<MainPage />);
    expect(screen.getByText('Rita Match')).toBeInTheDocument();
    expect(screen.getByText('Eva Smith')).toBeInTheDocument();
  });

  it('opens uncontrolled modal on button click', async () => {
    const user = userEvent.setup();
    render(<MainPage />);
    const btn = screen.getByRole('button', { name: /Open Uncontrolled Form/i });
    await user.click(btn);

    const modal = screen.getByRole('dialog');
    expect(within(modal).getByText(/uncontrolled form/i)).toBeInTheDocument();
  });

  it('opens controlled modal on button click', async () => {
    const user = userEvent.setup();
    render(<MainPage />);
    const btn = screen.getByRole('button', { name: /Open Controlled Form/i });
    await user.click(btn);

    const modal = screen.getByRole('dialog');
    expect(within(modal).getByText(/controlled form/i)).toBeInTheDocument();
  });
});
