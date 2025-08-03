import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './selectedSlice';

export const store = configureStore({
  reducer: {
    selectedPokemon: selectedItemsReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
