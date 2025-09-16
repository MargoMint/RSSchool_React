import type { CountryData, YearlyRecord } from '../types/CountryDataTypes';
import type { UpdatedFlags } from '../utils/getHighlightedCountries';
import { memo } from 'react';
import clsx from 'clsx';

const TD_BASE = 'border px-2 py-1 text-center';
interface TableRowProps {
  countryName: string;
  countryData: CountryData;
  selectedYear: number;
  updatedMap: Map<string, UpdatedFlags>;
  yearChanged: boolean;
}

const TableRow = memo(
  ({
    countryName,
    countryData,
    selectedYear,
    updatedMap,
    yearChanged,
  }: TableRowProps) => {
    const rowForYear: YearlyRecord | undefined = countryData.data.find(
      (row) => row.year === selectedYear
    );
    const flags = updatedMap.get(countryName);
    const popChanged = flags?.population ?? false;
    const co2Changed = flags?.co2 ?? false;
    const perCapitaChanged = flags?.co2_per_capita ?? false;

    return (
      <tr key={countryName}>
        <td className="border px-2 py-1 truncate">{countryName}</td>
        <td className={TD_BASE}>{countryData.iso_code ?? 'N/A'}</td>
        <td
          className={clsx(TD_BASE, 'transition-colors duration-700', {
            'bg-[var(--primary)]': yearChanged,
            'bg-transparent': !yearChanged,
          })}
        >
          {selectedYear}
        </td>
        <td
          className={clsx(TD_BASE, 'transition-colors duration-700', {
            'bg-[var(--primary)]': popChanged,
            'bg-transparent': !popChanged,
          })}
        >
          {rowForYear?.population ?? 'N/A'}
        </td>
        <td
          className={clsx(TD_BASE, 'transition-colors duration-700', {
            'bg-[var(--primary)]': co2Changed,
            'bg-transparent': !co2Changed,
          })}
        >
          {rowForYear?.co2 ?? 'N/A'}
        </td>
        <td
          className={clsx(TD_BASE, 'transition-colors duration-700', {
            'bg-[var(--primary)]': perCapitaChanged,
            'bg-transparent': !perCapitaChanged,
          })}
        >
          {rowForYear?.co2_per_capita ?? 'N/A'}
        </td>
      </tr>
    );
  }
);

TableRow.displayName = 'TableRow';

export default TableRow;
