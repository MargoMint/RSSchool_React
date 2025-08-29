import CountryTable from '../components/CountryTable';
import { useData } from '../hooks/useData';

function CountryTableWrapper() {
  const data = useData();
  return <CountryTable data={data} />;
}

export default CountryTableWrapper;
