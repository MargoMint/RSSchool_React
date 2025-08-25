import { createSlice } from '@reduxjs/toolkit';
import countriesList from '../data/countries';

interface CountriesState {
  allCountries: string[];
}

const initialState: CountriesState = {
  allCountries: countriesList,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries(state, action) {
      state.allCountries = action.payload;
    },
  },
});

export const { setCountries } = countriesSlice.actions;
export default countriesSlice.reducer;

export const selectAllCountries = (state: { countries: CountriesState }) =>
  state.countries.allCountries;
