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
  ...props
}: ThemeProviderProps) {
  const [user, setUser] = useState<UserType>(null);
  const [theme, setTheme] = useState<ColorThemeType>(
    user?.user_metadata.themeColor ?? "blue",
  );

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setTheme(user?.user_metadata.themeColor);
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
