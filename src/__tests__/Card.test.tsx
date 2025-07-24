import Card from '../components/Card';
import { render, screen } from '@testing-library/react';

describe('Card', () => {
  test('displays item name and description correctly', () => {
    render(
      <Card name="bulbasaur" description="Abilities: overgrow, chlorophyll" />
    );
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(
      screen.getByText('Abilities: overgrow, chlorophyll')
    ).toBeInTheDocument();
  });

  test('handles empty name and description gracefully', () => {
    const { container } = render(<Card name="" description="" />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0].textContent).toBe('');
    expect(paragraphs[1].textContent).toBe('');
  });
});
