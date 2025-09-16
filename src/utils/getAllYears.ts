import type { CountryData } from '../types/CountryDataTypes';

export function getAllYears(countries: [string, CountryData][]): number[] {
  const years = new Set<number>();

  countries.forEach(([, countryData]) => {
    countryData.data.forEach((row) => years.add(row.year));
  });

  return Array.from(years).sort((a, b) => a - b);
}
