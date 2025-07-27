import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Api from '../utils/Api';
import type { Pokemon } from '../types/Pokemon';
import Button from './Button';

function DetailPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedItem = searchParams.get('details');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (selectedItem) {
      const api = new Api();

      api
        .getPokemon(selectedItem)
        .then((data) => setSelectedPokemon(data[0]))
        .catch(() => {
          setSelectedPokemon(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setSelectedPokemon(null);
    }
  }, [selectedItem]);

  if (!selectedItem) return null;

  return (
    <div
      className="w-full md:w-1/3 max-h-[65vh] rounded-lg mt-4 p-4 bg-red-800 border border-gray-300 flex flex-col"
      data-testid="detail-panel"
    >
      {isLoading && <p className="text-center text-red-300">Loading...</p>}

      {error && <p className="text-center text-red-300">{error}</p>}

      {selectedPokemon && (
        <div className="flex flex-col gap-6 flex-grow text-white">
          <img
            src={selectedPokemon.image}
            alt={selectedPokemon.name}
            className="w-32 h-32 object-contain mx-auto"
          />

          <h2 className="text-3xl font-extrabold text-center uppercase border-b pb-2">
            {selectedPokemon.name}
          </h2>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex gap-1">
              <span className="font-semibold">Height:</span>
              <span>{selectedPokemon.height}</span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">Weight:</span>
              <span>{selectedPokemon.weight}</span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">Types:</span>
              <span className="capitalize">
                {selectedPokemon.types.join(', ')}
              </span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">Abilities:</span>
              <span className="capitalize">{selectedPokemon.description}</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-auto pt-4 flex justify-center">
        <Button
          onClick={() => {
            searchParams.delete('details');
            setSearchParams(searchParams);
          }}
          title="Close"
          variant="outline"
        />
      </div>
    </div>
  );
}

export default DetailPanel;
