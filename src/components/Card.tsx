interface CardProps {
  name: string;
  description: string;
  onCardClick: (name: string) => void;
}

function Card({ name, description, onCardClick }: CardProps) {
  return (
    <div
      data-testid="card"
      className="flex items-center justify-between border border-red-300 rounded-lg p-4 shadow"
      onClick={() => onCardClick(name)}
    >
      <p className="text-xl font-bold uppercase text-red-800">{name}</p>
      <p className="text-gray-700">
        {description ? `Abilities: ${description}` : null}
      </p>
    </div>
  );
}

export default Card;
