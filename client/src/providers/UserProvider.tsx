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

  supabase.auth.onAuthStateChange((event, session) => {
    if (session && session.provider_token) {
      window.localStorage.setItem(
        "oauth_provider_token",
        session.provider_token,
      );
    }

    if (session && session.provider_refresh_token) {
      window.localStorage.setItem(
        "oauth_provider_refresh_token",
        session.provider_refresh_token,
      );
    }

    if (event === "SIGNED_IN") {
      setStatus("authenticated");
    }

    if (event === "SIGNED_OUT") {
      setStatus("unauthenticated");
      window.localStorage.removeItem("oauth_provider_token");
      window.localStorage.removeItem("oauth_provider_refresh_token");
    }
  });

  return (
    <userContext.Provider value={{ user, status }}>
      {children}
    </userContext.Provider>
  );
};
