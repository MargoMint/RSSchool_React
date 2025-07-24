import Card from './Card';
import type { CardListItem } from '../types/Card';

interface CardListProps {
  cardItems: CardListItem[];
}

function CardList({ cardItems }: CardListProps) {
  return (
    <div className="p-4 grid grid-cols-1 gap-2">
      {cardItems.map((item, i) => (
        <Card key={i} name={item.name} description={item.description} />
      ))}
    </div>
  );
}

export default CardList;
