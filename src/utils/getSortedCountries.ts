import type { CountryData } from '../types/CountryDataTypes';

interface sortedCountriesProps {
  countries: [string, CountryData][];
  selectedYear: number;
  order?: 'none' | 'asc' | 'desc';
}

function getSortedCountries({
  countries,
  selectedYear,
  order = 'none',
}: sortedCountriesProps) {
  if (order === 'none') return countries;

  const countriesWithPopulation = countries.map(([name, data]) => ({
    name,
    data,
    population:
      data.data.find((row) => row.year === selectedYear)?.population ?? 0,
  }));

  countriesWithPopulation.sort((a, b) =>
    order === 'asc' ? a.population - b.population : b.population - a.population
  );

  return countriesWithPopulation.map(({ name, data }) => [name, data]);
}

export default getSortedCountries;
