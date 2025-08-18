import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../types/Pokemon';
import type { RootState } from './store';

interface SelectedState {
  selected: Pokemon[];
}

const initialState: SelectedState = {
  selected: [],
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
      state.selected = initialState.selected;
    },
  },
});

export const { togglePokemon, unselectAll } = selectedItemsSlice.actions;
export const selectSelectedPokemon = (state: RootState) =>
  state.selectedPokemon.selected;
export default selectedItemsSlice.reducer;
