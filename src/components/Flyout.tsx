import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { unselectAll } from '../store/selectedSlice';
import downloadCsv from '../utils/downloadCsv';
import Button from './Button';
import { useMemo } from 'react';

function Flyout() {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) => state.selectedPokemon.selected
  );

  const { url, fileName } = useMemo(() => {
    if (selected.length === 0) return { url: '', fileName: '' };
    const blob = new Blob([downloadCsv(selected)], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const fileName = `${selected.length}_items.csv`;
    return { url, fileName };
  }, [selected]);

  if (selected.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full p-3 bg-red-800 flex justify-between items-center">
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
          <a
            href={url}
            download={fileName}
            className="rounded-lg px-4 py-2 font-medium hover:cursor-pointer bg-white text-red-800 border-2 border-red-800"
          >
            Download
          </a>
        )}
      </div>
    </div>
  );
}

export default Flyout;
