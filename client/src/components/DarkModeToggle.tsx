import { useEffect, useState } from "react";
import useTheme from "@/hooks/useTheme";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

type Theme =
  | "blue"
  | "blue-dark"
  | "red"
  | "red-dark"
  | "green"
  | "green-dark"
  | "orange"
  | "orange-dark";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<string>(
    localStorage.getItem("selectedTheme") ?? "System"
  );

  useEffect(() => {
    const isSystemThemeDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (selectedTheme === "System") {
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
    } else if (selectedTheme === "Dark") {
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
    localStorage.setItem("selectedTheme", selectedTheme);
  }, [selectedTheme]);

  return (
    <div className="flex w-full justify-between items-center">
      <label htmlFor="darkMode">Dark Mode</label>
      <Select
        defaultValue="system"
        onValueChange={(value) => setSelectedTheme(value)}
      >
        <SelectTrigger
          id="darkMode"
          className="flex border-none gap-[6px] hover:bg-border/50 w-20 h-7 items-center  px-2 rounded-full transition-all"
        >
          <p className="whitespace-nowrap text-xs">{selectedTheme}</p>
        </SelectTrigger>
        <SelectContent className="flex flex-col w-fit p-2 rounded-xl text-foreground/80">
          <SelectGroup>
            <SelectItem value="Light">Light</SelectItem>
            <SelectItem value="Dark">Dark</SelectItem>
            <SelectItem value="System">System</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
