import '../globals.css';
import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import Providers from './providers';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'PokeSearch',
  description: 'PokeSearch',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
