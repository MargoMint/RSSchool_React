import { useGetPokemonByUrlQuery } from '../api/pokemonApi';
import StatusMessage from './StatusMessage';
import CardContainer from './CardContainer';
import type { Pokemon } from '../types/Pokemon';

interface CardLoaderProps {
  url: string;
  onCardClick: (name: string) => void;
}

function CardLoader({ url, onCardClick }: CardLoaderProps) {
  const { data, isLoading, error } = useGetPokemonByUrlQuery(url);

  if (isLoading || error) {
    return (
      <StatusMessage
        isLoading={isLoading}
        error={error ? error.toString() : null}
      />
    );
  }

  if (!data) return null;

  return <CardContainer pokemon={data as Pokemon} onCardClick={onCardClick} />;
}

export default CardLoader;
