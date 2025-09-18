import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ListItemOfForm from '../components/ListItemOfForm';

const mockData = {
  name: 'Rita Match',
  age: 23,
  email: 'rita@example.com',
  country: 'Poland',
  gender: 'Female',
  picture: 'rita.png',
  password: 'Abc1!',
  acceptTermsAndCondition: true,
};

describe('ListItemOfForm', () => {
  test('renders without crashing', () => {
    render(<ListItemOfForm data={mockData} />);
    const nameElement = screen.getByText('Rita Match');
    expect(nameElement).toBeInTheDocument();
  });

  test('displays all data correctly', () => {
    render(<ListItemOfForm data={mockData} />);
    expect(screen.getByText('Rita Match')).toBeInTheDocument();
    expect(screen.getByText('Age: 23')).toBeInTheDocument();
    expect(screen.getByText('Email: rita@example.com')).toBeInTheDocument();
    expect(screen.getByText('Country: Poland')).toBeInTheDocument();
    expect(screen.getByText('Gender: Female')).toBeInTheDocument();
  });

  test('renders image with correct src and alt', () => {
    render(<ListItemOfForm data={mockData} />);
    const imgElement = screen.getByAltText(
      'Rita Match img'
    ) as HTMLImageElement;
    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toContain('rita.png');
  });

  test('applies correct background class when isNew is true', () => {
    const { container } = render(<ListItemOfForm data={mockData} isNew />);
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveClass('bg-[var(--primary-pink)]');
  });
});
