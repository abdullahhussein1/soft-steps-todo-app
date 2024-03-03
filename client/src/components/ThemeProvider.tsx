import ThemeProviderContext from "@/context/ThemeProviderContext";
import { useEffect, useState } from "react";
import ColorThemeType from "@/types/ColorThemeType";
import UserType from "@/types/UserType";

type ThemeProviderProps = {
  children: React.ReactNode;
  user?: UserType;
  storageKey?: string;
};

export default function ThemeProvider({
  children,
  user,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ColorThemeType>(
    user?.user_metadata.color_theme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.className = theme;
  }, [theme]);

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
