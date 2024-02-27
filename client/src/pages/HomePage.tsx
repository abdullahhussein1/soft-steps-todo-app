import Menu from "../components/Menu";
import TodoList from "../components/TodoList";
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

  console.log(darkModeState);

  const systemThemeDark = window.matchMedia("(prefers-color-scheme: dark)");

  useEffect(() => {
    if (darkModeState !== "System") return;

    if (systemThemeDark.matches) {
      const newTheme = theme.includes("-dark")
        ? theme
        : ((theme + "-dark") as ColorThemeType);

      setTheme(newTheme);
    } else {
      const newTheme = theme.includes("-dark")
        ? (theme.replace("-dark", "") as ColorThemeType)
        : theme;

      setTheme(newTheme);
    }

    // This callback will fire if the perferred color scheme changes without a reload
    systemThemeDark.addEventListener("change", (evt) => {
      if (darkModeState !== "System") return;
      if (evt.matches) {
        const newTheme = theme.includes("-dark")
          ? theme
          : ((theme + "-dark") as ColorThemeType);

        setTheme(newTheme);
      } else {
        const newTheme = theme.includes("-dark")
          ? (theme.replace("-dark", "") as ColorThemeType)
          : theme;

        setTheme(newTheme);
      }
    });
  }, []);

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
          <TodoList user={user} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
