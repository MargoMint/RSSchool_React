import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../types/Pokemon';

const initialState = {
  selected: [] as Pokemon[],
};

export const selectedItemsSlice = createSlice({
  name: 'selectedPokemon',
  initialState,
  reducers: {
    togglePokemon(state, action: PayloadAction<Pokemon>) {
      const exists = state.selected.find(
        (item) => item.id === action.payload.id
      );
      if (exists) {
        state.selected = state.selected.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.selected.push(action.payload);
      }
    },

    unselectAll(state) {
      state.selected = [];
    },
  },
});

export const { togglePokemon, unselectAll } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
