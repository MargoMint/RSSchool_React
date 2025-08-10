import { useSearchParams } from 'react-router-dom';
import Button from './Button';
import StatusMessage from './StatusMessage';
import useTheme from '../hooks/useTheme';
import clsx from 'clsx';
import { useGetPokemonQuery } from '../api/pokemonApi';

function DetailPanel() {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedItem = searchParams.get('details');

  const {
    data: loadedPokemon,
    isLoading,
    error,
  } = useGetPokemonQuery(selectedItem ?? '', {
    skip: !selectedItem,
  });

  if (!selectedItem) return null;

  return (
    <div
      className="w-full md:w-1/3 max-h-[65vh] rounded-lg mt-4 p-4 bg-red-800 border border-red-400 flex flex-col"
      data-testid="detail-panel"
    >
      <StatusMessage
        isLoading={isLoading}
        error={error ? error.toString() : null}
      />

      {loadedPokemon && (
        <div
          className={clsx(
            'flex flex-col gap-6 flex-grow',
            theme === 'dark' ? 'text-[#1b1b1b]' : 'text-white'
          )}
        >
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
          variant="modal"
        />
      </div>
    </div>
  );
}

export default DetailPanel;
