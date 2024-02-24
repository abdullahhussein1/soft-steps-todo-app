import useTheme from "@/hooks/useTheme";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
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

export default function DarkModeButton() {
  const { theme, setTheme } = useTheme();

  const isSystemThemeDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  function handleDarkModeValueChange(value: string) {
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
        defaultValue="System"
        onValueChange={(value) => handleDarkModeValueChange(value)}
      >
        <SelectTrigger className="flex border-none text-xs font-normal bg-secondary/50 justify-between hover:bg-border/50 w-20 h-7 items-center  px-2 rounded-full transition-all">
          <SelectValue />
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
