import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useTheme from "@/hooks/useTheme";

export default function ThemesToggle() {
  const { setTheme } = useTheme();

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
        <DropdownMenuItem onClick={() => setTheme("blue")}>
          Blue
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("green")}>
          Green
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("red")}>Red</DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme("orange")}>
          Orange
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("yellow")}>
          Yellow
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("purple")}>
          Purple
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
