'use client';

import { useEffect, useState } from 'react';
import useTheme from '../hooks/useTheme';

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

  const themeDescription =
    theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';

  return <img src={themeIcon} alt={themeDescription} className="w-8 h-8" />;
}

export default Icon;
