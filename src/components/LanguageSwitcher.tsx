'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const currentLocale = pathname.split('/')[1] || 'en';

  return (
    <div className="flex gap-2 text-red-700 font-medium text-sm">
      <Link href={pathname.replace(`/${currentLocale}`, '/en')}>EN</Link>
      <Link href={pathname.replace(`/${currentLocale}`, '/ru')}>RU</Link>
    </div>
  );
}
