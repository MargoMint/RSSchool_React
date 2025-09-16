import { useState } from 'react';
import search from '../assets/search.png';
import type { ChangeEvent, FormEvent } from 'react';

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedValue = searchValue.trim();
    setSearchValue(trimmedValue);
    onSearch(trimmedValue);
  };

  return (
    <form
      className="border-b border-[var(--white)] flex items-center gap-2"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Find a country"
        value={searchValue}
        onChange={handleInputChange}
        className="flex-1 bg-transparent outline-none text-[var(--white)]"
        aria-label="Find a country"
      />
      <button type="submit" aria-label="Search" className="p-1">
        <img src={search} alt="search" className="w-4 h-4" />
      </button>
    </form>
  );
}

export default Search;
