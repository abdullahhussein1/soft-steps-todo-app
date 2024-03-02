import { createContext, ReactNode, useEffect, useState } from "react";
import DarkModeStateType from "@/types/DarkModeStateType";
import supabase from "@/supabase/supabase";
import UserType from "@/types/UserType";

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
  const [user, setUser] = useState<UserType>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    fetchUser();
  }, []);

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
