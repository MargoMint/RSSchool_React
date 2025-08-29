import type { CountryData, YearlyRecord } from '../types/CountryDataTypes';
import { useState, useMemo } from 'react';
import sortedCountries from '../utils/sortedCountries';
import sort from '../assets/sort.png';

const TH_BASE = 'border px-2 py-1 font-decor text-xl text-left';
const TD_BASE = 'border px-2 py-1 text-center';

interface CountryTableProps {
  data: Record<string, CountryData>;
}

function CountryTable({ data }: CountryTableProps) {
  const countries = Object.entries(data);

  const allYears = useMemo(() => {
    const firstCountry = countries[0]?.[1];
    return firstCountry ? firstCountry.data.map((row) => row.year) : [];
  }, [countries]);

  const [selectedYear, setSelectedYear] = useState<number>(
    allYears[allYears.length - 1]
  );

  const [sortMethod, setsortMethod] = useState<'none' | 'asc' | 'desc'>('none');

  const handleSortClick = () => {
    setsortMethod((prev) =>
      prev === 'none' ? 'desc' : prev === 'desc' ? 'asc' : 'none'
    );
  };

  const countriesToDisplay =
    sortMethod === 'none'
      ? countries
      : sortedCountries({ countries, selectedYear, order: sortMethod });

  return (
    <div className="flex justify-center items-center py-10">
      <table className="min-w-5xl text-sm table-fixed">
        <thead className="bg-[var(--primary)]">
          <tr>
            <th className={`${TH_BASE} w-40`}>Country</th>
            <th className={`${TH_BASE} w-20`}>ISO code</th>
            <th className={`${TH_BASE} w-28`}>
              <select
                className="bg-transparent w-full font-decor"
                value={selectedYear}
                onChange={(e) => setSelectedYear(+e.target.value)}
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
          {countriesToDisplay.map(([countryName, countryData]) => {
            const rowForYear: YearlyRecord | undefined = countryData.data.find(
              (row) => row.year === selectedYear
            );

            return (
              <tr
                key={countryData.iso_code ?? countryName}
                className="border-t"
              >
                <td className="border px-2 py-1 truncate">{countryName}</td>
                <td className={TD_BASE}>{countryData.iso_code ?? 'N/A'}</td>
                <td className={TD_BASE}>{selectedYear}</td>
                <td className={TD_BASE}>{rowForYear?.population ?? 'N/A'}</td>
                <td className={TD_BASE}>{rowForYear?.co2 ?? 'N/A'}</td>
                <td className={TD_BASE}>
                  {rowForYear?.co2_per_capita ?? 'N/A'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default CountryTable;
