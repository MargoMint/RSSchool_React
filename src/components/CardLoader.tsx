import { useGetPokemonByUrlQuery } from '../api/pokemonApi';
import Card from './Card';
import StatusMessage from './StatusMessage';

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

  return <Card pokemon={data} onCardClick={onCardClick} />;
}

export default CardLoader;
