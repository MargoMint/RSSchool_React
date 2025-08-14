import { useAppDispatch, useAppSelector } from '../store/hooks';
import { unselectAll, selectSelectedPokemon } from '../store/selectedSlice';
import downloadCsv from '../utils/downloadCsv';
import Button from './Button';
import { useMemo } from 'react';
import {
  FLYOUT_CONTAINER_CLASSES,
  FILE_DOWNLOAD_CLASSES,
} from '../constants/flyoutClasses';

function Flyout() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectSelectedPokemon);

  const { url, fileName } = useMemo(() => {
    if (selected.length === 0) return { url: '', fileName: '' };
    const blob = new Blob([downloadCsv(selected)], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const fileName = `${selected.length}_items.csv`;
    return { url, fileName };
  }, [selected]);

  if (selected.length === 0) return null;

  return (
    <div className={FLYOUT_CONTAINER_CLASSES}>
      <p className="text-white uppercase font-bold">
        {selected.length} item{selected.length > 1 ? 's are' : ''} selected
      </p>

      <div className="flex gap-4">
        <Button
          title="Unselect all"
          variant="modal"
          onClick={() => dispatch(unselectAll())}
        />

        {url && (
          <a href={url} download={fileName} className={FILE_DOWNLOAD_CLASSES}>
            Download
          </a>
        )}
      </div>
    </div>
  );
}

export default Flyout;
