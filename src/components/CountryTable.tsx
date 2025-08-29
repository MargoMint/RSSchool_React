import type { CountryData, YearlyRecord } from '../types/CountryDataTypes';
import { useState, useMemo } from 'react';

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

  return (
    <div className="flex justify-center items-center py-10">
      <table className="min-w-5xl text-sm table-fixed">
        <thead className="bg-[var(--primary)]">
          <tr>
            <th className="border px-2 py-1 w-40">Country</th>
            <th className="border px-2 py-1 w-28">ISO code</th>
            <th className="border px-2 py-1 w-28">
              <select
                className="bg-transparent w-full"
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
            <th className="border px-2 py-1 w-36">Population</th>
            <th className="border px-2 py-1 w-28">CO2</th>
            <th className="border px-2 py-1 w-40">CO2 per capita</th>
          </tr>
        </thead>
        <tbody>
          {countries.map(([countryName, countryData]) => {
            const rowForYear: YearlyRecord | undefined = countryData.data.find(
              (row) => row.year === selectedYear
            );

            return (
              <tr
                key={countryData.iso_code ?? countryName}
                className="border-t"
              >
                <td className="border px-2 py-1 truncate">{countryName}</td>
                <td className="border px-2 py-1 text-center">
                  {countryData.iso_code ?? 'N/A'}
                </td>
                <td className="border px-2 py-1 text-center">{selectedYear}</td>
                <td className="border px-2 py-1 text-right">
                  {rowForYear?.population?.toLocaleString() ?? 'N/A'}
                </td>
                <td className="border px-2 py-1 text-right">
                  {rowForYear?.co2?.toLocaleString() ?? 'N/A'}
                </td>
                <td className="border px-2 py-1 text-right">
                  {rowForYear?.co2_per_capita?.toLocaleString() ?? 'N/A'}
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
