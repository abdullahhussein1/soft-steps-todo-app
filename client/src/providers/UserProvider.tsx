import { createContext, useEffect, useState, ReactNode } from "react";
import supabase from "@/supabase/supabase";
import UserType from "@/types/UserType";

type Props = {
  children: ReactNode;
};

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type UserContextType = {
  user: UserType | null;
  status: AuthStatus;
};

const initialState: UserContextType = {
  user: null,
  status: "loading",
};

// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext<UserContextType>(initialState);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setUser(user);
          setStatus("authenticated");
        } else {
          setStatus("unauthenticated");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setStatus("unauthenticated");
      }
    };

    fetchUser();
  }, []);

  return (
    <userContext.Provider value={{ user, status }}>
      {children}
    </userContext.Provider>
  );
};
