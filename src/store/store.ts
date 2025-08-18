import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './selectedSlice';
import { pokemonApi } from '../api/pokemonApi';

export const store = configureStore({
  reducer: {
    selectedPokemon: selectedItemsReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
