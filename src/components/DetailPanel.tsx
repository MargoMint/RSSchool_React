'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from '../i18n/navigation';
import Button from './Button';
import StatusMessage from './StatusMessage';
import { useGetPokemonQuery } from '../api/pokemonApi';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import getValidPage from '../utils/getValidPage';

function DetailPanel() {
  const t = useTranslations('DetailPanel');
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedItem = searchParams.get('details');
  const currentPage = getValidPage(searchParams);

  const {
    data: loadedPokemon,
    isLoading,
    error,
  } = useGetPokemonQuery(selectedItem ?? '', {
    skip: !selectedItem,
  });

  if (!selectedItem) return null;

  const handleClose = () => {
    router.push({
      pathname: '/',
      query: { page: currentPage },
    });
  };

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
          className={
            'flex flex-col gap-6 flex-grow text-[var(--primary-white)]'
          }
        >
          <Image
            src={loadedPokemon.image}
            alt={loadedPokemon.name}
            width={128}
            height={128}
            className="object-contain mx-auto"
          />

          <h2 className="text-3xl font-extrabold text-center uppercase border-b border-[var(--primary-white)] pb-2">
            {loadedPokemon.name}
          </h2>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex gap-1">
              <span className="font-semibold">{t('height')}:</span>
              <span>{loadedPokemon.height}</span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">{t('weight')}:</span>
              <span>{loadedPokemon.weight}</span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">{t('types')}:</span>
              <span className="capitalize">
                {loadedPokemon.types.join(', ')}
              </span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">{t('abilities')}:</span>
              <span className="capitalize">{loadedPokemon.description}</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-auto pt-4 flex justify-center">
        <Button onClick={handleClose} title={t('close')} variant="modal" />
      </div>
    </div>
  );
}

export default DetailPanel;
