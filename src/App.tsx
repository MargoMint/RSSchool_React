import { Suspense } from 'react';
import Spinner from './components/Spinner';
import CountryTableWrapper from './components/CountryTableWrapper';

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <CountryTableWrapper />
    </Suspense>
  );
}

export default App;
