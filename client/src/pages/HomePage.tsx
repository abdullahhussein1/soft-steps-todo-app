import Menu from "../components/Menu";
import AppPanel from "../components/AppPanel";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import supabase from "@/supabase/supabase";
import useTheme from "@/hooks/useTheme";
import useDarkMode from "@/hooks/useDarkMode";
import ColorThemeType from "@/types/ColorThemeType";

const HomePage = () => {
  const [user, setUser] = useState<User | null>(null);
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

    if (darkModeState === "system") {
      systemThemeDark.addEventListener("change", handleSystemThemeChange);
      handleSystemThemeChange({
        matches: systemThemeDark.matches,
      } as MediaQueryListEvent);
    }

    return () => {
      // Cleanup the event listener when the component unmounts
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
        const updatedMetadata = {
          ...user.user_metadata,
          themeColor: theme,
          darkMode: darkModeState,
        };

        // Update the user's metadata
        const { data: updateData, error } = await supabase.auth.updateUser({
          data: updatedMetadata,
        });

        if (error) {
          console.error("Error updating user metadata:", error.message);
        } else {
          console.log("User metadata updated successfully:", updateData);
        }
      }
    };

    // Call the function to update user metadata
    updateUserData();
  }, [theme, darkModeState]);

  if (!user) {
    return <div className="bg-neutral-900/50"></div>;
  }

  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center bg-secondary">
      <div className="flex w-full max-w-xl flex-col gap-2 p-5">
        <div className="flex items-center justify-end">
          <Menu user={user} />
        </div>
        <div className="container flex h-[590px] max-w-xl flex-col rounded-[30px] bg-background p-5 shadow-2xl shadow-gray-950/20">
          <AppPanel user={user} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
