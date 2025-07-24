import Card from './Card';
import type { Pokemon } from '../types/Pokemon';

interface CardListProps {
  cardItems: Pokemon[];
}

function CardList({ cardItems }: CardListProps) {
  return (
    <div className="p-4 grid grid-cols-1 gap-2">
      {cardItems.map((item) => (
        <Card key={item.id} name={item.name} description={item.description} />
      ))}
    </div>
  );
}

export default CardList;
