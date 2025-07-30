import { useState } from 'react';

function useLocalStorage(
  key: string,
  initialValue: string
): [string, (val: string) => void] {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ?? initialValue;
  });

  const updateValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return [value, updateValue];
}

export default useLocalStorage;
