import CardList from './CardList';
import StatusMessage from './StatusMessage';
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
  if (isLoading || error) {
    return <StatusMessage isLoading={isLoading} error={error} />;
  }

  return <CardList cardItems={results} onCardClick={onCardClick} />;
}

export default ResultsArea;
