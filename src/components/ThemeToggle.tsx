'use client';

import useTheme from '../hooks/useTheme';
import Button from './Button';
import Icon from './Icon';
import lightThemeIcon from '../img/light-theme.png';
import darkThemeIcon from '../img/dark-theme.png';

function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} variant="icon">
      <Icon
        lightThemeIcon={lightThemeIcon.src}
        darkThemeIcon={darkThemeIcon.src}
      />
    </Button>
  );
}

export default ThemeToggle;
