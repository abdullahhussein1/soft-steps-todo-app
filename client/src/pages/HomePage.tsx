import Menu from "../components/Menu";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "@/supabase/supabase";
import useTheme from "@/hooks/useTheme";
import useDarkMode from "@/hooks/useDarkMode";
import ColorThemeType from "@/types/ColorThemeType";
import { changeFavIcon, getFavIcon } from "@/utils/utils";
import UserType from "@/types/UserType";
import AppBoard from "../components/AppBoard";

type props = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

const HomePage = ({ user, setUser }: props) => {
  const navigate = useNavigate();
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

    changeFavIcon(getFavIcon(theme) as string);

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
    if (user) {
      setUser(user);
    } else {
      setUser(null);
      navigate("/auth");
    }
  }, [user, setUser, navigate]);

  useEffect(() => {
    const updateUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: updateData, error } = await supabase.auth.updateUser({
          data: {
            color_theme: theme,
            dark_mode: darkModeState,
          },
        });

        if (error) {
          console.error("Error updating user metadata:", error.message);
        } else {
          console.log("User metadata updated successfully:", updateData);
        }
      }
    };

    updateUserData();
  }, [theme, darkModeState]);

  return (
    <div className="flex h-[100dvh] items-center justify-center bg-secondary">
      <div className="flex h-full w-full max-w-xl flex-col items-center justify-end gap-1 px-2 sm:justify-center">
        <div className="flex w-full items-center justify-end">
          <Menu user={user} />
        </div>
        <div className="container flex h-[90dvh] max-w-xl flex-col rounded-t-[30px] bg-background px-5 pt-5 shadow-2xl shadow-gray-950/20 sm:rounded-[30px]">
          <AppBoard user={user} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
