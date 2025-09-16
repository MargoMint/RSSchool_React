import type { CountryData } from '../types/CountryDataTypes';
import { useState, useMemo, useCallback } from 'react';
import sortedCountries from '../utils/sortedCountries';
import sort from '../assets/sort.png';
import useHighlightedRows from '../hooks/useHighlightedRows';
import Search from './Search';
import TableRow from './TableRow';

enum SortMethod {
  NONE = 'none',
  ASC = 'asc',
  DESC = 'desc',
}

const TH_BASE = 'border px-2 py-1 font-decor text-xl text-left';

interface CountryTableProps {
  data: Record<string, CountryData>;
}

function CountryTable({ data }: CountryTableProps) {
  const countries = useMemo(() => Object.entries(data), [data]);

  const [searchValue, setSearchValue] = useState<string>('');

  const allYears = useMemo(() => {
    const firstCountry = countries[0]?.[1];
    return firstCountry ? firstCountry.data.map((row) => row.year) : [];
  }, [countries]);

  const [selectedYear, setSelectedYear] = useState<number>(
    allYears[allYears.length - 1]
  );

  const { updatedMap, yearChanged } = useHighlightedRows(
    countries,
    selectedYear
  );

  const [sortMethod, setSortMethod] = useState<SortMethod>(SortMethod.NONE);

  const handleSortClick = () => {
    setSortMethod((prev) =>
      prev === SortMethod.NONE
        ? SortMethod.DESC
        : prev === SortMethod.DESC
          ? SortMethod.ASC
          : SortMethod.NONE
    );
  };

  const countriesToDisplay = useMemo(
    () =>
      sortMethod === SortMethod.NONE
        ? countries
        : sortedCountries({ countries, selectedYear, order: sortMethod }),
    [countries, selectedYear, sortMethod]
  );

  const filteredCountries = useMemo(() => {
    const normalizedQuery = searchValue.toLowerCase();
    return normalizedQuery.length === 0
      ? countriesToDisplay
      : countriesToDisplay.filter(([countryName]) =>
          countryName.toLowerCase().includes(normalizedQuery)
        );
  }, [countriesToDisplay, searchValue]);

  const onSearch = (term: string) => {
    setSearchValue(term);
  };

  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedYear(+e.target.value);
    },
    []
  );

  return (
    <div className="flex justify-center items-center py-10">
      <table className="min-w-5xl text-sm table-fixed">
        <thead className="bg-[var(--primary-dark)]">
          <tr>
            <th className={`${TH_BASE} w-40`}>
              Country <Search onSearch={onSearch} />
            </th>
            <th className={`${TH_BASE} w-20`}>ISO code</th>
            <th className={`${TH_BASE} w-28`}>
              <select
                className="bg-transparent w-full font-decor"
                value={selectedYear}
                onChange={handleYearChange}
              >
                {allYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </th>
            <th className={`${TH_BASE} w-36 select-none`}>
              <button
                onClick={handleSortClick}
                className="w-full cursor-pointer flex items-center justify-between"
              >
                <span>Population</span>
                <img src={sort} alt="sort" className="w-4 h-4" />
              </button>
            </th>
            <th className={`${TH_BASE} w-28`}>CO2</th>
            <th className={`${TH_BASE} w-30`}>CO2 per capita</th>
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map(([countryName, countryData]) => (
            <TableRow
              key={countryName}
              countryName={countryName}
              countryData={countryData}
              selectedYear={selectedYear}
              updatedMap={updatedMap}
              yearChanged={yearChanged}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CountryTable;
