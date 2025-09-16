import { useState } from 'react';
import search from '../assets/search.png';
import type { ChangeEvent, KeyboardEvent } from 'react';

interface SearchProps {
  onSearch: (country: string) => void;
}

function Search({ onSearch }: SearchProps) {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value.trim());
  };

  const handleSearch = () => {
    const trimmedValue = searchValue.trim();
    setSearchValue(trimmedValue);
    onSearch(trimmedValue);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="border-b border-[var(--white)] flex items-center gap-2">
      <input
        type="text"
        placeholder="Find a country"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent outline-none text-[var(--white)]"
        aria-label="Find a country"
      />
      <button
        onClick={handleSearch}
        aria-label="Search"
        className="p-1"
        type="button"
      >
        <img src={search} alt="search" className="w-4 h-4" />
      </button>
    </div>
  );
}

export default Search;
