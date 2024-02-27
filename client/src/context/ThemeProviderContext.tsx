import { createContext } from "react";
import ColorThemeType from "@/types/ColorThemeType";

type ThemeProviderState = {
  theme: ColorThemeType;
  setTheme: (theme: ColorThemeType) => void;
};

const initialState: ThemeProviderState = {
  theme: "blue",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export default ThemeProviderContext;
