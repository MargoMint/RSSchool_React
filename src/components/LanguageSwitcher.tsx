'use client';

import { Link, usePathname } from '../i18n/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const route: '/' | '/about' = pathname.includes('/about') ? '/about' : '/';

  return (
    <div className="flex gap-2 text-red-700 font-medium text-sm">
      <Link href={route} locale="en">
        EN
      </Link>
      <Link href={route} locale="ru">
        RU
      </Link>
    </div>
  );
}
