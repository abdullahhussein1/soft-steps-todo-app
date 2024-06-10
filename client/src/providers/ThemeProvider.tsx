import { useEffect, useState } from "react";
import { createContext } from "react";
import ColorThemeType from "@/types/ColorThemeType";

type ThemeProviderProps = {
  children: React.ReactNode;
  themeColor: ColorThemeType;
  storageKey?: string;
};

export default function ThemeProvider({
  children,
  themeColor,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ColorThemeType>(themeColor);

  useEffect(() => {
    const root = window.document.documentElement;

    root.className = theme;
  }, [theme]);

  useEffect(() => {
    setTheme(themeColor);
  }, [themeColor]);

  const value = {
    theme,
    setTheme: (theme: ColorThemeType) => {
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

type ThemeProviderState = {
  theme: ColorThemeType;
  setTheme: (theme: ColorThemeType) => void;
};

const initialState: ThemeProviderState = {
  theme: "blue",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
