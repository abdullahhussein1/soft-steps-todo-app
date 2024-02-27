import useTheme from "@/hooks/useTheme";
import { Check } from "lucide-react";
import ColorThemeType from "@/types/ColorThemeType";

type Props = {
  color: string;
};

const ColorThemeButton = ({ color }: Props) => {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = (selectedTheme: ColorThemeType) => {
    const isDarkMode = theme.includes("-dark");

    const newTheme = isDarkMode ? `${selectedTheme}-dark` : selectedTheme;

    setTheme(newTheme as ColorThemeType);
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
        "flex h-10 w-10 items-center justify-center rounded-full p-2",
        getButtonColor(color),
      ].join(" ")}
      onClick={() => handleThemeChange(color as ColorThemeType)}
    >
      {theme.includes(color) && (
        <div className="h-5 w-5 rounded-full bg-white">
          <Check className="h-full w-full p-1 text-black" />
        </div>
      )}
    </button>
  );
};

export default ColorThemeButton;
