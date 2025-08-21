import type { Pokemon } from '../types/Pokemon';

interface CardProps {
  pokemon: Pokemon;
  onCardClick: (name: string) => void;
  isSelected: boolean;
  onCheckboxChange: () => void;
}

function Card({
  pokemon,
  onCardClick,
  isSelected,
  onCheckboxChange,
}: CardProps) {
  return (
    <div className="flex items-center gap-4">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onCheckboxChange}
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
