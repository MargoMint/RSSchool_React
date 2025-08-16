'use client';

import { useState } from 'react';

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (val: T) => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const updateValue = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, updateValue];
}

export default useLocalStorage;
