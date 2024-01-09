import { useEffect } from "react";
import useTheme from "@/hooks/useTheme";
import { Switch } from "@/components/ui/switch";

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

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
      setTheme(theme.includes("-dark") ? theme : ((theme + "-dark") as Theme));
    }
  }, [setTheme, theme]);

  const toggleDarkMode = () => {
    const newTheme = theme.includes("-dark")
      ? (theme.replace("-dark", "") as Theme)
      : ((theme + "-dark") as Theme);
    setTheme(newTheme);
    localStorage.setItem(
      "darkMode",
      newTheme.includes("-dark") ? "true" : "false"
    );
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="dark-mode"
        checked={theme.includes("-dark")}
        onCheckedChange={toggleDarkMode}
      />
      <label htmlFor="dark-mode">Dark Mode</label>
    </div>
  );
}
