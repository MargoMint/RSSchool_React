'use client';

import { Provider } from 'react-redux';
import { store } from '../store/store';
import ThemeContextProvider from '../context/ThemeContextProvider';
import type { PropsWithChildren } from 'react';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </Provider>
  );
}
