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
    localStorage.getItem("selectedTheme") as string,
  );
  const { theme, setTheme } = useTheme();

  const isSystemThemeDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
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
