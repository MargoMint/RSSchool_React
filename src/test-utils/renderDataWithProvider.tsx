import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from '../store/selectedSlice';

function renderDataWithProvider(data: React.ReactElement) {
  const testStore = configureStore({
    reducer: {
      selectedPokemon: selectedReducer,
    },
    preloadedState: {
      selectedPokemon: {
        selected: [],
      },
    },
  });

  return render(<Provider store={testStore}>{data}</Provider>);
}

export default renderDataWithProvider;
