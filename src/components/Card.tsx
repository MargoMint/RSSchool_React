import type { CardListItem } from '../types/Card';

function Card({ name, description }: CardListItem) {
  return (
    <div className="flex items-center justify-between border border-red-300 rounded-lg p-4 shadow">
      <p className="text-xl font-bold text-red-800">{name.toUpperCase()}</p>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

export default Card;
