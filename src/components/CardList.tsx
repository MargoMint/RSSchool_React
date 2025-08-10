import CardLoader from './CardLoader';
import type { BasicPokemon } from '../types/Pokemon';

interface CardListProps {
  cardItems: BasicPokemon[];
  onCardClick: (name: string) => void;
}

function CardList({ cardItems, onCardClick }: CardListProps) {
  return (
    <div className="p-4 grid grid-cols-1 gap-2">
      {cardItems.map((item) => (
        <CardLoader key={item.url} url={item.url} onCardClick={onCardClick} />
      ))}
    </div>
  );
}

export default CardList;
