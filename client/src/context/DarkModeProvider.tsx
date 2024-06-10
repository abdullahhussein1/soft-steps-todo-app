import { createContext, useState } from "react";
import DarkModeStateType from "@/types/DarkModeStateType";

type DarkModeContextType = {
  darkModeState: DarkModeStateType;
  setDarkModeState: (darkModeState: DarkModeStateType) => void;
};

export const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined,
);

type Props = {
  darkMode: DarkModeStateType;
  children: React.ReactNode;
};

const DarkModeProvider = ({ darkMode, children }: Props) => {
  const [darkModeState, setDarkModeState] =
    useState<DarkModeStateType>(darkMode);

  const contextValue: DarkModeContextType = {
    darkModeState,
    setDarkModeState: (newDarkModeState) => {
      setDarkModeState(newDarkModeState);
    },
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
