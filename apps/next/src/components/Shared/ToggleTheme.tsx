import { Box, Button } from '@violetit/ui';

import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from 'next-themes';

import { useIsMounted } from 'src/hooks/useIsMounted';

type ThemeIconProps = {
  [key: string]: React.ReactNode;
};

const THEME_ICON: ThemeIconProps = {
  light: <FiSun />,
  dark: <FiMoon />,
};

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const isMounted = useIsMounted();

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!isMounted) return null;

  return (
    <Button variant="neutral" onClick={handleToggleTheme}>
      {theme && <Box className="pointer-events-none">{THEME_ICON[theme]}</Box>}
    </Button>
  );
};
