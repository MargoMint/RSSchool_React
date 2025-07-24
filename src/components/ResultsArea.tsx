import CardList from './CardList';
import type { MainState } from '../types/MainState';

function ResultsArea({ isLoading, error, results }: MainState) {
  if (isLoading) {
    return <p className="text-center text-red-800">Loading...</p>;
  }
  if (error) {
    return <p className="text-center text-red-800">{error}</p>;
  }

  return <CardList cardItems={results} />;
}

export default ResultsArea;
