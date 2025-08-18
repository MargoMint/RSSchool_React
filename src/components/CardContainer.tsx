import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectSelectedPokemon, togglePokemon } from '../store/selectedSlice';
import type { Pokemon } from '../types/Pokemon';
import Card from './Card';

interface CardContainerProps {
  pokemon: Pokemon;
  onCardClick: (name: string) => void;
}

function CardContainer({ pokemon, onCardClick }: CardContainerProps) {
  const dispatch = useAppDispatch();

  const isSelectedPokemon = useAppSelector(selectSelectedPokemon).some(
    (item) => item.id === pokemon.id
  );

  const handleCheckboxChange = () => {
    dispatch(togglePokemon(pokemon));
  };

  return (
    <Card
      pokemon={pokemon}
      onCardClick={onCardClick}
      isSelected={isSelectedPokemon}
      onCheckboxChange={handleCheckboxChange}
    />
  );
}

export default CardContainer;
