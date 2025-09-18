import { useAppSelector } from '../../store/hooks';
import { selectAllCountries } from '../../store/countriesSlice';

function CountryOptions() {
  const countries = useAppSelector(selectAllCountries);

  return (
    <>
      {countries.map((country) => (
        <option key={country} value={country} />
      ))}
    </>
  );
}

export default CountryOptions;
