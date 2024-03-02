import { createContext, ReactNode, useState } from "react";
import DarkModeStateType from "@/types/DarkModeStateType";
import supabase from "@/supabase/supabase";

type DarkModeContextType = {
  darkModeState: DarkModeStateType;
  setDarkModeState: (darkModeState: DarkModeStateType) => void;
};

const {
  data: { user },
} = await supabase.auth.getUser();

export const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined,
);

export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const darkMode = user?.user_metadata.darkMode as DarkModeStateType;
  const [darkModeState, setDarkModeState] = useState<DarkModeStateType>(
    darkMode || "system",
  );

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
