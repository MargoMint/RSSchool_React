import { useEffect, useState } from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import Api from '../api/Api';
import type { Pokemon } from '../types/Pokemon';
import Button from './Button';
import InfoMessage from './InfoMessage';
import { mapPokemon } from '../utils/mapPokemon';

function DetailPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedItem = searchParams.get('details');
  const [loadedPokemon, setLoadedPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { api } = useOutletContext<{ api: Api }>();

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (selectedItem) {
      api
        .getPokemon(selectedItem, mapPokemon)
        .then((data) => setLoadedPokemon(data[0]))
        .catch(() => {
          setLoadedPokemon(null);
          setError('Failed to load Pokemon details');
        })
        .finally(() => setIsLoading(false));
    } else {
      setLoadedPokemon(null);
    }
  }, [selectedItem, api]);

  if (!selectedItem) return null;

  return (
    <div
      className="w-full md:w-1/3 max-h-[65vh] rounded-lg mt-4 p-4 bg-red-800 border border-gray-300 flex flex-col"
      data-testid="detail-panel"
    >
      {isLoading && <InfoMessage message="Loading.." />}

      {error && <InfoMessage message={error} />}

      {loadedPokemon && (
        <div className="flex flex-col gap-6 flex-grow text-white">
          <img
            src={loadedPokemon.image}
            alt={loadedPokemon.name}
            className="w-32 h-32 object-contain mx-auto"
          />

          <h2 className="text-3xl font-extrabold text-center uppercase border-b pb-2">
            {loadedPokemon.name}
          </h2>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex gap-1">
              <span className="font-semibold">Height:</span>
              <span>{loadedPokemon.height}</span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">Weight:</span>
              <span>{loadedPokemon.weight}</span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">Types:</span>
              <span className="capitalize">
                {loadedPokemon.types.join(', ')}
              </span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">Abilities:</span>
              <span className="capitalize">{loadedPokemon.description}</span>
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
