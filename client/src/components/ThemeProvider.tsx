import ThemeProviderContext from "@/context/ThemeProviderContext";
import { useEffect, useState } from "react";

type Theme =
  | "blue"
  | "blue-dark"
  | "red"
  | "red-dark"
  | "green"
  | "green-dark"
  | "orange"
  | "orange-dark"
  | "neutral"
  | "neutral-dark"
  | "purple"
  | "purple-dark"
  | "yellow"
  | "yellow-dark";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export default function ThemeProvider({
  children,
  defaultTheme = "blue",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.className = theme;
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
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
