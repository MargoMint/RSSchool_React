import Card from './Card';
import type { Pokemon } from '../types/Pokemon';

interface CardListProps {
  cardItems: Pokemon[];
  onCardClick: (name: string) => void;
}

function CardList({ cardItems, onCardClick }: CardListProps) {
  return (
    <div className="p-4 grid grid-cols-1 gap-2">
      {cardItems.map((item) => (
        <Card
          key={item.id}
          name={item.name}
          description={item.description}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
}

export default CardList;
