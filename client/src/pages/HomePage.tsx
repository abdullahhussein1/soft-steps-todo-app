import Menu from "../components/Menu";
import TodoList from "../components/TodoList";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClient, User } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_KEY as string
);

const TodoApp = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: userData, error } = await supabase.auth.getUser();
        if (userData) {
          setUser(userData.user);
        } else {
          console.error("Error fetching user:", error);
          // Redirect to the authentication page if the user is not signed in
          navigate("/auth");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        // Redirect to the authentication page in case of an error
        navigate("/auth");
      }
    };

    fetchUser();
  }, [navigate]);

  React.useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="h-[100dvh] flex flex-col bg-secondary justify-center items-center">
      <div className="w-full max-w-xl gap-2 flex flex-col p-5">
        <div className="flex items-center justify-end">
          <Menu user={user} />
        </div>
        <div className="container bg-background shadow-2xl shadow-gray-950/20 rounded-[30px] h-[590px] max-w-xl flex flex-col p-5">
          <TodoList user={user} />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
