import { useState, useEffect } from 'react';
import Button from './Button';

interface SearchProps {
  onSearch: (term: string) => void;
}

function Search({ onSearch }: SearchProps) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedTerm = localStorage.getItem('searchTerm') || '';
    setInputValue(savedTerm);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();
    onSearch(trimmedValue);
    localStorage.setItem('searchTerm', trimmedValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="flex gap-4 justify-center items-center p-4">
      <input
        type="text"
        className="border border-gray-400 rounded-lg px-4 py-2 w-64"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <Button onClick={handleSearch} title="Search" />
    </div>
  );
}

export default Search;
