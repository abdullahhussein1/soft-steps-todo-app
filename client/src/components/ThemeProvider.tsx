import ThemeProviderContext from "@/context/ThemeProviderContext";
import { useEffect, useState } from "react";
import ColorThemeType from "@/types/ColorThemeType";
import supabase from "@/supabase/supabase";
import UserType from "@/types/UserType";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ColorThemeType;
  storageKey?: string;
};

export default function ThemeProvider({
  children,
  defaultTheme = "blue",
  ...props
}: ThemeProviderProps) {
  const [user, setUser] = useState<UserType>(null);
  const [theme, setTheme] = useState<ColorThemeType>(
    () => (user?.user_metadata.themeColor as ColorThemeType) ?? defaultTheme,
  );

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    fetchUser();
  }, []);

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
