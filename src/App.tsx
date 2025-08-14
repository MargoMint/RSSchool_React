import AppRouter from './AppRouter';
import ThemeContextProvider from './context/ThemeContextProvider';
import { store } from './store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <AppRouter />
      </ThemeContextProvider>
    </Provider>
  );
}

export default App;
