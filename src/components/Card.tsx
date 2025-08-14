import { togglePokemon } from '../store/selectedSlice';
import type { Pokemon } from '../types/Pokemon';
import { useAppDispatch, useAppSelector } from '../store/hooks';
interface CardProps {
  pokemon: Pokemon;
  onCardClick: (name: string) => void;
}

function Card({ pokemon, onCardClick }: CardProps) {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) =>
    state.selectedPokemon.selected.find((item) => item.id === pokemon.id)
  );

  const handleCheckboxChange = () => {
    dispatch(togglePokemon(pokemon));
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="checkbox"
        checked={!!selected}
        onChange={handleCheckboxChange}
        className="w-5 h-5 accent-red-800 cursor-pointer"
      />

      <div
        data-testid="card"
        className="flex flex-col flex-grow border border-red-400 rounded-lg p-4 shadow cursor-pointer hover:shadow-md transition"
        onClick={() => onCardClick(pokemon.name)}
      >
        <p className="text-xl font-bold uppercase text-red-800">
          {pokemon.name}
        </p>
        <p>
          {pokemon.description ? `Abilities: ${pokemon.description}` : null}
        </p>
      </div>
    </div>
  );
}

export default Card;
