import CardContainer from './CardContainer';
import CardLoader from './CardLoader';
import type { Pokemon, BasicPokemon } from '../types/Pokemon';

interface CardListProps {
  cardItems: (Pokemon | BasicPokemon)[];
  onCardClick: (name: string) => void;
}

function CardList({ cardItems, onCardClick }: CardListProps) {
  return (
    <div className="p-4 grid grid-cols-1 gap-2">
      {cardItems.map((item) =>
        'url' in item ? (
          <CardLoader key={item.url} url={item.url} onCardClick={onCardClick} />
        ) : (
          <CardContainer
            key={item.id}
            pokemon={item}
            onCardClick={onCardClick}
          />
        )
      )}
    </div>
  );
}

export default CardList;
