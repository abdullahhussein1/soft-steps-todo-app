import ThemeProviderContext from "@/context/ThemeProviderContext";
import { useEffect, useState } from "react";
import ColorThemeType from "@/types/ColorThemeType";
import supabase from "@/supabase/supabase";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ColorThemeType;
  storageKey?: string;
};

const {
  data: { user },
} = await supabase.auth.getUser();

export default function ThemeProvider({
  children,
  defaultTheme = "blue",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] =
    useState<ColorThemeType>(
      () => user?.user_metadata.themeColor as ColorThemeType,
    ) || defaultTheme;

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
