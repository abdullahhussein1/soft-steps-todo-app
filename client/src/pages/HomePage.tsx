import Menu from "../components/Menu";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "@/supabase/supabase";
import useTheme from "@/hooks/useTheme";
import useDarkMode from "@/hooks/useDarkMode";
import ColorThemeType from "@/types/ColorThemeType";
import { changeFavIcon, getFavIcon } from "@/utils/utils";
import AppBoard from "../components/AppBoard";
import useUser from "@/hooks/useUser";
import StepsProvider from "@/providers/StepsProvider";

const HomePage = () => {
  const navigate = useNavigate();
  const { status } = useUser();
  const { theme, setTheme } = useTheme();
  const { darkModeState } = useDarkMode();

  const systemThemeDark = window.matchMedia("(prefers-color-scheme: dark)");

  useEffect(() => {
    const handleSystemThemeChange = (evt: MediaQueryListEvent) => {
      if (darkModeState !== "system") return;

      const newTheme = evt.matches
        ? theme.includes("-dark")
          ? theme
          : ((theme + "-dark") as ColorThemeType)
        : theme.includes("-dark")
          ? (theme.replace("-dark", "") as ColorThemeType)
          : theme;

      setTheme(newTheme);
    };

    changeFavIcon(getFavIcon(theme));

    if (darkModeState === "system") {
      systemThemeDark.addEventListener("change", handleSystemThemeChange);
      handleSystemThemeChange({
        matches: systemThemeDark.matches,
      } as MediaQueryListEvent);
    }

    return () => {
      if (darkModeState === "system") {
        systemThemeDark.removeEventListener("change", handleSystemThemeChange);
      }
    };
  }, [darkModeState, theme, setTheme, systemThemeDark]);

  useEffect(() => {
    if (status === "unauthenticated") {
      navigate("/auth");
    }
  }, [status, navigate]);

  useEffect(() => {
    const updateUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { error } = await supabase.auth.updateUser({
          data: {
            color_theme: theme,
            dark_mode: darkModeState,
          },
        });

        if (error) {
          console.error("Error updating user metadata:", error.message);
        }
      }
    };

    updateUserData();
  }, [theme, darkModeState]);

  return (
    <div className="flex h-[100dvh] items-center justify-center bg-secondary">
      <div className="flex h-full w-full max-w-xl flex-col items-center justify-end gap-1 px-2 sm:justify-center">
        <div className="flex w-full items-center justify-end">
          <Menu />
        </div>
        <div className="container flex h-[90dvh] max-w-xl flex-col rounded-t-[30px] bg-background px-5 pt-5 shadow-2xl shadow-gray-950/20 sm:rounded-[30px]">
          <StepsProvider>
            <AppBoard />
          </StepsProvider>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
