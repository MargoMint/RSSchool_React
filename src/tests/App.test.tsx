import App from '../App';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';

vi.mock('../pages/MainPage', () => {
  return {
    MainPage: () => <div>Mocked MainPage</div>,
  };
});

describe('App', () => {
  test('renders MainPage as expected', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText('Mocked MainPage')).toBeInTheDocument();
  });
});
