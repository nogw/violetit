import React, { useCallback, useMemo, useState } from 'react';

export interface ThemeContextValue {
  theme: 'light' | 'dark';
  handleChange: () => void;
}

const getInitialTheme = (): ThemeContextValue['theme'] => {
  const theme = localStorage.getItem('@violetit_react_theme');

  if (!theme) return 'light';

  const themeOptions: ThemeContextValue['theme'][] = ['light', 'dark'];

  if (themeOptions.includes(theme as ThemeContextValue['theme'])) {
    return theme as ThemeContextValue['theme'];
  }

  return 'light';
};

export const ThemeContext = React.createContext<ThemeContextValue>(null!);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeContextValue['theme']>(getInitialTheme());

  const handleChange = useCallback<ThemeContextValue['handleChange']>(() => {
    const newTheme = theme == 'light' ? 'dark' : 'light';

    setTheme(newTheme);

    localStorage.setItem('@violetit_react_theme', newTheme);
    document.documentElement.classList.value = newTheme;
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      handleChange,
    }),
    [theme, handleChange],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
