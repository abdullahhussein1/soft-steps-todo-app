import { createContext, useState } from "react";
import DarkModeStateType from "@/types/DarkModeStateType";
import UserType from "@/types/UserType";

type DarkModeContextType = {
  darkModeState: DarkModeStateType;
  setDarkModeState: (darkModeState: DarkModeStateType) => void;
};

export const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined,
);

type Props = {
  user: UserType;
  children: React.ReactNode;
};

export const DarkModeProvider = ({ user, children }: Props) => {
  const darkMode = user?.user_metadata.dark_mode as DarkModeStateType;
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
