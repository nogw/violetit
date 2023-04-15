import { Box, Flex, Label, SelectInput } from '@violetit/ui';

import { FiCommand, FiSun, FiMoon, FiCode } from 'react-icons/fi';
import { useTheme } from 'next-themes';

import { useIsMounted } from 'src/hooks/useIsMounted';

type ThemeOptionsProps = Record<string, { label: string; icon: React.ReactNode }>;

const THEME_OPTIONS: ThemeOptionsProps = {
  system: {
    label: 'System',
    icon: <FiCommand />,
  },
  light: {
    label: 'Light',
    icon: <FiSun />,
  },
  dark: {
    label: 'Dark',
    icon: <FiMoon />,
  },
};

export const ThemeSelect = () => {
  const { theme, themes, setTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setTheme(e.target.value);

  return (
    <Flex className="relative inline-block transition-colors">
      <Label htmlFor="theme-menu" className="sr-only">
        Toggle theme
      </Label>
      {theme && (
        <Box className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-lg opacity-50">
          {THEME_OPTIONS[theme].icon}
        </Box>
      )}
      <Box className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2">
        <FiCode className="rotate-90 opacity-50" />
      </Box>
      <SelectInput
        id="theme-menu"
        variant="neutral"
        className="pl-8 pr-10 font-semibold"
        value={theme}
        onChange={handleChange}
      >
        {themes.map(theme => {
          return (
            <option key={theme} value={theme}>
              {THEME_OPTIONS[theme].label}
            </option>
          );
        })}
      </SelectInput>
    </Flex>
  );
};
