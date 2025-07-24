import Button from '../components/Button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  const userActions = userEvent.setup();

  test('renders button children correctly', () => {
    render(<Button onClick={() => {}}>The label on the button</Button>);
    expect(screen.getByRole('button')).toHaveTextContent(
      'The label on the button'
    );
  });

  test('button works as expected even if there are no children', () => {
    render(<Button onClick={() => {}}>{null}</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('clicking on the button triggers onClick', async () => {
    const handleClick = jest.fn();
    render(
      <Button
        onClick={() => {
          handleClick();
        }}
      >
        The label on the button
      </Button>
    );
    await userActions.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick without click on the button', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>The label on the button</Button>);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
