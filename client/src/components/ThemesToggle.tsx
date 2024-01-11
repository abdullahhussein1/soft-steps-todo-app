import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useTheme from "@/hooks/useTheme";

type Theme =
  | "blue"
  | "blue-dark"
  | "red"
  | "red-dark"
  | "green"
  | "green-dark"
  | "orange"
  | "orange-dark"
  | "yellow"
  | "yellow-dark"
  | "purple"
  | "purple-dark";

export default function ThemesToggle() {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = (selectedTheme: Theme) => {
    const isDarkMode = theme.includes("-dark");

    const newTheme = isDarkMode ? `${selectedTheme}-dark` : selectedTheme;

    setTheme(newTheme as Theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-none w-fit px-2 bg-background hover:bg-background transition-none rounded-full"
        >
          Toggle theme
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleThemeChange("blue")}>
          Blue
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("green")}>
          Green
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("red")}>
          Red
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("orange")}>
          Orange
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("yellow")}>
          Yellow
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("purple")}>
          Purple
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
