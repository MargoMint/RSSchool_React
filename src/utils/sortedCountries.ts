import type { CountryData } from '../types/CountryDataTypes';

interface sortedCountriesProps {
  countries: [string, CountryData][];
  selectedYear: number;
  order: 'asc' | 'desc';
}

function sortedCountries({
  countries,
  selectedYear,
  order,
}: sortedCountriesProps) {
  return countries.slice().sort((a, b) => {
    const popA =
      a[1].data.find((row) => row.year === selectedYear)?.population ?? 0;
    const popB =
      b[1].data.find((row) => row.year === selectedYear)?.population ?? 0;

    return order === 'asc' ? popA - popB : popB - popA;
  });
}

export default sortedCountries;
