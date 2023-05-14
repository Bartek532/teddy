import { useEffect, useMemo, useState } from "react";

import { createSafeContext } from "../lib/context";
import { THEME } from "../utils/types";

import type { ReactNode } from "react";

interface ThemeContextValue {
  theme: THEME;
  changeTheme: (theme: THEME) => void;
}

const [useThemeContext, ThemeContextProvider] =
  createSafeContext<ThemeContextValue>();

const getCurrentTheme = (): THEME => {
  const localStorageTheme = window.localStorage.getItem("theme");

  if (localStorageTheme === THEME.DARK || localStorageTheme === THEME.LIGHT) {
    return localStorageTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEME.DARK
    : THEME.LIGHT;
};

const ThemeProvider = ({ children }: { readonly children: ReactNode }) => {
  const [theme, setTheme] = useState<THEME>(THEME.LIGHT);

  const changeTheme = (theme: THEME) => {
    window.localStorage.setItem("theme", theme);

    setTheme(theme);
  };

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  useEffect(() => {
    const target = document.querySelector("html");

    if (theme === THEME.DARK) {
      target?.classList.add("dark");
    } else {
      target?.classList.remove("dark");
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      changeTheme,
    }),
    [theme],
  );

  return <ThemeContextProvider value={value}>{children}</ThemeContextProvider>;
};

export { useThemeContext, ThemeProvider };
