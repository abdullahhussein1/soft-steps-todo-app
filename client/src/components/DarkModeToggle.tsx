import { useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Switch } from "@/components/ui/switch";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
      setTheme((prevTheme) =>
        prevTheme.includes("-dark") ? prevTheme : prevTheme + "-dark"
      );
    }
  }, [setTheme]);

  const toggleDarkMode = () => {
    const newTheme = theme.includes("-dark")
      ? theme.replace("-dark", "")
      : theme + "-dark";
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
