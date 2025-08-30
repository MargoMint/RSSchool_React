import type { CountryData } from '../types/CountryDataTypes';

export interface UpdatedFlags {
  population: boolean;
  co2: boolean;
  co2_per_capita: boolean;
}

function valuesEqual(a: number | undefined, b: number | undefined): boolean {
  if (a === undefined && b === undefined) return true;
  if (a === undefined || b === undefined) return false;
  return Number(a) === Number(b);
}

function getHighlightedCountries(
  countries: [string, CountryData][],
  prevYear: number,
  selectedYear: number
): Map<string, UpdatedFlags> {
  const updatedMap = new Map<string, UpdatedFlags>();

  countries.forEach(([countryName, countryData]) => {
    const prevRow = countryData.data.find((row) => row.year === prevYear);
    const currRow = countryData.data.find((row) => row.year === selectedYear);

    const populationChanged = !valuesEqual(
      prevRow?.population,
      currRow?.population
    );
    const co2Changed = !valuesEqual(prevRow?.co2, currRow?.co2);
    const co2PerCapitaChanged = !valuesEqual(
      prevRow?.co2_per_capita,
      currRow?.co2_per_capita
    );

    if (populationChanged || co2Changed || co2PerCapitaChanged) {
      updatedMap.set(countryName, {
        population: populationChanged,
        co2: co2Changed,
        co2_per_capita: co2PerCapitaChanged,
      });
    }
  });

  return updatedMap;
}

export default getHighlightedCountries;
