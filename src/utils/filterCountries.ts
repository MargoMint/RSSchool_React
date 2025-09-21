import type { CountryData } from '../types/CountryDataTypes';

function filterCountries(
  countries: [string, CountryData][],
  searchValue: string
): [string, CountryData][] {
  const normalizedQuery = searchValue.toLowerCase();
  if (normalizedQuery.length === 0) return countries;

  return countries.filter(([countryName]) =>
    countryName.toLowerCase().includes(normalizedQuery)
  );
}

export default filterCountries;
