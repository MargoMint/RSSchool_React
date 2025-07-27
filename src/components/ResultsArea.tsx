import CardList from './CardList';
import type { MainState } from '../types/MainState';

interface ResultsAreaProps extends MainState {
  onCardClick: (name: string) => void;
}

function ResultsArea({
  isLoading,
  error,
  results,
  onCardClick,
}: ResultsAreaProps) {
  if (isLoading) {
    return <p className="text-center text-red-800">Loading...</p>;
  }
  if (error) {
    return <p className="text-center text-red-800">{error}</p>;
  }

  return <CardList cardItems={results} onCardClick={onCardClick} />;
}

export default ResultsArea;
