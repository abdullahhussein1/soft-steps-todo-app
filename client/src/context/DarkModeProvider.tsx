import { createContext, ReactNode, useState } from "react";

type DarkModeStateType = "System" | "Dark" | "Light";

type DarkModeContextType = {
  darkModeState: DarkModeStateType;
  setDarkModeState: (darkModeState: DarkModeStateType) => void;
};

export const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined,
);

export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const storedDarkModeState = localStorage.getItem(
    "selectedTheme",
  ) as DarkModeStateType;
  const [darkModeState, setDarkModeState] = useState<DarkModeStateType>(
    storedDarkModeState || "System",
  );

  const contextValue: DarkModeContextType = {
    darkModeState,
    setDarkModeState: (newDarkModeState) => {
      setDarkModeState(newDarkModeState);
      localStorage.setItem("selectedTheme", newDarkModeState);
    },
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};
