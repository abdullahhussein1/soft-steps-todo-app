import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import supabase from "@/supabase/supabase";
import UserType from "@/types/UserType";

type Props = {
  children: ReactNode;
};

type UserContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
};

const initialState: UserContextType = {
  user: null,
  setUser: () => null,
};

// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext<UserContextType>(initialState);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };

    fetchUser();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
