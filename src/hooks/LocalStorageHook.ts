import { useState } from 'react';

function useLocalStorage(
  key: string,
  initialValue: string
): [string, (val: string) => void] {
  const [value, setValue] = useState(() => {
    try {
      return localStorage.getItem(key) ?? initialValue;
    } catch {
      return initialValue;
    }
  });

  const updateValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return [value, updateValue];
}

export default useLocalStorage;
