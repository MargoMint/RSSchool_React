import App from '../App';
import { render, screen } from '@testing-library/react';

jest.mock('../AppRouter', () => {
  const MockedAppRouter = () => <div>Mocked AppRouter</div>;
  return MockedAppRouter;
});

describe('App', () => {
  test('renders AppRouter as expected', () => {
    render(<App />);
    expect(screen.getByText('Mocked AppRouter')).toBeInTheDocument();
  });
});
