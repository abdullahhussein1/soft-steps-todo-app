import useTheme from "@/hooks/useTheme";
import { Check } from "lucide-react";

type Theme =
  | "blue"
  | "blue-dark"
  | "red"
  | "red-dark"
  | "green"
  | "green-dark"
  | "orange"
  | "orange-dark"
  | "neutral"
  | "neutral-dark"
  | "purple"
  | "purple-dark"
  | "yellow"
  | "yellow-dark";

type Props = {
  color: string;
};

const ColorThemeButton = ({ color }: Props) => {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = (selectedTheme: Theme) => {
    const isDarkMode = theme.includes("-dark");

    const newTheme = isDarkMode ? `${selectedTheme}-dark` : selectedTheme;

    setTheme(newTheme as Theme);
  };

  const getButtonColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      case "red":
        return "bg-red-500";
      case "orange":
        return "bg-orange-500";
      case "purple":
        return "bg-purple-700";
      case "neutral":
        return "bg-neutral-600";
      case "yellow":
        return "bg-yellow-400";
    }
  };

  return (
    <button
      className={[
        "flex justify-center items-center w-10 h-10 p-2 rounded-full",
        getButtonColor(color),
      ].join(" ")}
      onClick={() => handleThemeChange(color as Theme)}
    >
      {theme.includes(color) && (
        <div className="w-5 h-5 rounded-full bg-white">
          <Check className="w-full h-full p-1 text-black" />
        </div>
      )}
    </button>
  );
};

export default ColorThemeButton;
