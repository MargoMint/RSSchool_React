import type { CountryData } from '../types/CountryDataTypes';
import { useEffect, useRef, useState } from 'react';
import getHighlightedCountries, {
  type UpdatedFlags,
} from '../utils/getHighlightedCountries';

type HighlightResult = {
  updatedMap: Map<string, UpdatedFlags>;
  yearChanged: boolean;
};

function useHighlightedRows(
  countries: [string, CountryData][],
  selectedYear: number
): HighlightResult {
  const prevYearRef = useRef<number>(selectedYear);
  const [updatedMap, setUpdatedMap] = useState<Map<string, UpdatedFlags>>(
    new Map()
  );
  const [yearChanged, setYearChanged] = useState<boolean>(false);

  useEffect(() => {
    if (selectedYear === prevYearRef.current) {
      return;
    }

    const updated = getHighlightedCountries(
      countries,
      prevYearRef.current,
      selectedYear
    );
    setUpdatedMap(updated);
    setYearChanged(true);

    prevYearRef.current = selectedYear;

    const timer = setTimeout(() => {
      setUpdatedMap(new Map());
      setYearChanged(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedYear, countries]);

  return { updatedMap, yearChanged };
}

export default useHighlightedRows;
