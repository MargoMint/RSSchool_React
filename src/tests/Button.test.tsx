import Button from '../components/Button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  const userActions = userEvent.setup();

  test('renders button title correctly', () => {
    render(
      <Button
        onClick={() => {}}
        title="The label on the button"
        variant="primary"
      />
    );
    expect(screen.getByRole('button')).toHaveTextContent(
      'The label on the button'
    );
  });

  test('renders button with empty title without error', () => {
    render(<Button onClick={() => {}} title="" variant="primary" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('clicking on the button triggers onClick', async () => {
    const handleClick = vi.fn();
    render(
      <Button
        onClick={handleClick}
        title="The label on the button"
        variant="primary"
      />
    );
    await userActions.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick without click on the button', () => {
    const handleClick = vi.fn();
    render(
      <Button
        onClick={handleClick}
        title="The label on the button"
        variant="primary"
      />
    );
    expect(handleClick).not.toHaveBeenCalled();
  });
});
