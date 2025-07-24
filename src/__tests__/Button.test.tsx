import Button from '../components/Button';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button', () => {
  test('renders button title correctly', () => {
    render(<Button onClick={() => {}} title="The label on the button" />);
    expect(screen.getByRole('button')).toHaveTextContent(
      'The label on the button'
    );
  });

  test('renders button with empty title without error', () => {
    render(<Button onClick={() => {}} title="" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('clicking on the button triggers onClick', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} title="The label on the button" />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick without click on the button', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} title="The label on the button" />);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
