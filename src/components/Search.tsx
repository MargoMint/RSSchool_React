'use client';

import Button from './Button';
import useLocalStorage from '../hooks/useLocalStorage';

interface SearchProps {
  onSearch: (term: string) => void;
}

function Search({ onSearch }: SearchProps) {
  const [savedValue, setSavedValue] = useLocalStorage('searchTerm', '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSavedValue(e.target.value);
  };

  const handleSearch = () => {
    const trimmedValue = savedValue.trim();
    onSearch(trimmedValue);
    setSavedValue(trimmedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="flex gap-4 justify-center items-center p-4">
      <input
        type="text"
        className="border border-gray-400 rounded-lg px-4 py-2 w-64"
        value={savedValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleSearch} title="Search" variant={'primary'} />
    </div>
  );
}

export default Search;
