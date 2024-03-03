import Menu from "../components/Menu";
import AppPanel from "../components/AppPanel";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import supabase from "@/supabase/supabase";
import useTheme from "@/hooks/useTheme";
import useDarkMode from "@/hooks/useDarkMode";
import ColorThemeType from "@/types/ColorThemeType";
import blue from "@/assets/images/blue.png";
import red from "@/assets/images/red.png";
import green from "@/assets/images/green.png";
import orange from "@/assets/images/orange.png";
import purple from "@/assets/images/purple.png";
import neutral from "@/assets/images/neutral.png";
import yellow from "@/assets/images/yellow.png";

const HomePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { darkModeState } = useDarkMode();

  const systemThemeDark = window.matchMedia("(prefers-color-scheme: dark)");

  const changeFavicon = (link: string): void => {
    let $favicon = document.querySelector(
      'link[rel="icon"]',
    ) as HTMLLinkElement;
    if ($favicon !== null) {
      $favicon.href = link;
    } else {
      $favicon = document.createElement("link");
      $favicon.rel = "icon";
      $favicon.href = link;
      document.head.appendChild($favicon);
    }
  };

  function getFavIcon(theme: string) {
    const newTheme = theme.split("-")[0];
    switch (newTheme) {
      case "blue":
        return blue;
      case "red":
        return red;
      case "green":
        return green;
      case "purple":
        return purple;
      case "orange":
        return orange;
      case "yellow":
        return yellow;
      case "neutral":
        return neutral;
      case "default":
        return blue;
    }
  }

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

    changeFavicon(getFavIcon(theme) as string);

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
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        navigate("/auth");
      }
    };

    fetchUser();
  }, [navigate]);

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
    <div className="flex h-[100dvh] items-center justify-center bg-secondary landscape:h-full">
      <div className="flex h-full w-full max-w-xl flex-col items-center justify-end gap-1 px-2 sm:justify-center">
        <div className="flex w-full items-center justify-end">
          <Menu user={user} />
        </div>
        <div className="container flex h-[90dvh] max-w-xl flex-col rounded-t-[30px] bg-background px-5 pt-5 shadow-2xl shadow-gray-950/20 sm:rounded-[30px]">
          <AppPanel user={user} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
