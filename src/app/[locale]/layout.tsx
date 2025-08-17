import '../../globals.css';
import type { Metadata } from 'next';
import Providers from '../providers';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import type { PropsWithChildren } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'PokeSearch',
  description: 'PokeSearch',
};

type LocaleLayoutProps = PropsWithChildren<{
  params: Promise<{ locale: string }>;
}>;

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!['en', 'ru'].includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <Providers>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
