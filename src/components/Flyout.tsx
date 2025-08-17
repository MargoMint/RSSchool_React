'use client';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { unselectAll, selectSelectedPokemon } from '../store/selectedSlice';
import Button from './Button';
import { useTranslations, useLocale } from 'next-intl';

const FLYOUT_CONTAINER_CLASSES =
  'fixed bottom-0 left-0 w-full p-3 bg-red-800 flex justify-between items-center';

function Flyout() {
  const locale = useLocale();
  const t = useTranslations('HomePage');
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectSelectedPokemon);

  if (selected.length === 0) return null;

  const handleDownload = () => {
    const names = selected.map((pokemon) => pokemon.name).join(',');
    window.location.href = `/api/downloadCsv?names=${names}&locale=${locale}`;
  };

  return (
    <div className={FLYOUT_CONTAINER_CLASSES}>
      <p className="text-white uppercase font-bold">
        {t('selectedItems', { count: selected.length })}
      </p>
      <div className="flex gap-4">
        <Button
          title={t('unselectAll')}
          variant="modal"
          onClick={() => dispatch(unselectAll())}
        />
        <Button
          title={t('download')}
          variant="modal"
          onClick={handleDownload}
        />
      </div>
    </div>
  );
}

export default Flyout;
