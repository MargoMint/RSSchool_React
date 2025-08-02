import useTheme from '../hooks/useTheme';
import Button from './Button';
import lightThemeIcon from '../img/light-theme.png';
import darkThemeIcon from '../img/dark-theme.png';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const themeIcon = theme === 'light' ? lightThemeIcon : darkThemeIcon;
  const themeDescription =
    theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';

  return (
    <Button onClick={toggleTheme} variant="icon">
      <img src={themeIcon} alt={themeDescription} className="w-8 h-8" />
    </Button>
  );
}

export default ThemeToggle;
