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
import { useState } from "react";

type Theme =
  | "blue"
  | "blue-dark"
  | "red"
  | "red-dark"
  | "green"
  | "green-dark"
  | "orange"
  | "orange-dark";

export default function DarkModeButton() {
  const [darkModeState, setDarkModeState] = useState<string>(
    localStorage.getItem("selectedTheme") as string
  );
  const { theme, setTheme } = useTheme();

  const isSystemThemeDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  function handleDarkModeValueChange(value: string) {
    setDarkModeState(value);
    if (value === "System") {
      if (isSystemThemeDark) {
        const newTheme = theme.includes("-dark")
          ? theme
          : ((theme + "-dark") as Theme);

        setTheme(newTheme);
      } else {
        const newTheme = theme.includes("-dark")
          ? (theme.replace("-dark", "") as Theme)
          : theme;

        setTheme(newTheme);
      }
    } else if (value === "Dark") {
      const newTheme = theme.includes("-dark")
        ? theme
        : ((theme + "-dark") as Theme);

      setTheme(newTheme);
    } else {
      const newTheme = theme.includes("-dark")
        ? (theme.replace("-dark", "") as Theme)
        : theme;

      setTheme(newTheme);
    }
    localStorage.setItem("selectedTheme", value);
  }

  return (
    <div className="flex w-full justify-between items-center">
      <label htmlFor="darkMode">Dark Mode</label>
      <Select
        defaultValue={darkModeState}
        onValueChange={(value) => handleDarkModeValueChange(value)}
      >
        <SelectTrigger className="flex border-none text-xs font-normal bg-secondary/70 justify-between hover:bg-border/20 w-fit h-7 items-center rounded-full transition-all">
          <div className="flex items-center gap-1 mr-2">
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
        <SelectContent className="flex flex-col w-fit p-2 rounded-xl text-foreground/80">
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
