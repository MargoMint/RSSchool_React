'use client';

import { useEffect, useState } from 'react';
import useTheme from '../hooks/useTheme';
import Image from 'next/image';

interface IconProps {
  lightThemeIcon: string;
  darkThemeIcon: string;
}

function Icon({ lightThemeIcon, darkThemeIcon }: IconProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themeIcon = theme === 'light' ? lightThemeIcon : darkThemeIcon;

  return <Image src={themeIcon} alt="themeIcon" width={32} height={32} />;
}

export default Icon;
