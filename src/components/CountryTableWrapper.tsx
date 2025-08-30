import CountryTable from '../components/CountryTable';
import { useData } from '../hooks/useData';
import type { Database } from '../types/CountryDataTypes';

function CountryTableWrapper() {
  const data: Database = useData();
  return <CountryTable data={data} />;
}

export default CountryTableWrapper;
