import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroImage from '../components/HeroImage';

describe('HeroImage', () => {
  test('renders without crashing', () => {
    render(<HeroImage />);
    const imgElement = screen.getByAltText('Hero');
    expect(imgElement).toBeInTheDocument();
  });

  test('displays the correct image source', () => {
    render(<HeroImage />);
    const imgElement = screen.getByAltText('Hero') as HTMLImageElement;
    expect(imgElement.src).toContain('hero.png');
  });
});
