import ThemeProviderContext from "@/context/ThemeProviderContext";
import { useEffect, useState } from "react";
import ColorThemeType from "@/types/ColorThemeType";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ColorThemeType;
  storageKey?: string;
};

export default function ThemeProvider({
  children,
  defaultTheme = "blue",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ColorThemeType>(
    () => (localStorage.getItem(storageKey) as ColorThemeType) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.className = theme;
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: ColorThemeType) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
