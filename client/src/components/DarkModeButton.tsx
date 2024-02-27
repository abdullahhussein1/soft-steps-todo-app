import useTheme from "@/hooks/useTheme";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import ColorThemeType from "@/types/ColorThemeType";

export default function DarkModeButton() {
  const [darkModeState, setDarkModeState] = useState<string>(
    localStorage.getItem("selectedTheme") as string,
  );
  const { theme, setTheme } = useTheme();

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

  function handleDarkModeValueChange(value: string) {
    setDarkModeState(value);
    if (value === "System") {
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
    } else if (value === "Dark") {
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
    localStorage.setItem("selectedTheme", value);
  }

  return (
    <div className="flex w-full items-center justify-between">
      <label htmlFor="darkMode">Dark Mode</label>
      <Select
        defaultValue={darkModeState}
        onValueChange={(value) => handleDarkModeValueChange(value)}
      >
        <SelectTrigger className="flex h-7 w-fit items-center justify-between rounded-full border-none bg-secondary/70 text-xs font-normal transition-all hover:bg-border/20">
          <div className="mr-2 flex items-center gap-1">
            {darkModeState === "Light" ? (
              <Sun size={12} />
            ) : darkModeState === "System" ? (
              <Monitor size={12} />
            ) : (
              <Moon size={12} />
            )}
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent className="flex w-fit flex-col rounded-xl p-2 text-foreground/80">
          <SelectGroup>
            <SelectItem value="Light">
              <p>Light</p>
            </SelectItem>
            <SelectItem value="Dark">Dark</SelectItem>
            <SelectItem value="System">System</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
