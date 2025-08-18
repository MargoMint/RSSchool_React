import useTheme from '../hooks/useTheme';

interface IconProps {
  lightThemeIcon: string;
  darkThemeIcon: string;
}

function Icon({ lightThemeIcon, darkThemeIcon }: IconProps) {
  const { theme } = useTheme();

  const themeIcon = theme === 'light' ? lightThemeIcon : darkThemeIcon;

  return <img src={themeIcon} alt="theme icon" className="w-8 h-8" />;
}

export default Icon;
