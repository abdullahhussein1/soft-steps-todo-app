import Menu from "../components/Menu";
import TodoList from "../components/TodoList";
import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import supabase from "@/supabase/supabase";

const TodoApp = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session);
  });

  React.useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        console.log(user.id);
      } else {
        console.error("Error fetching user:", error);
        setUser(null);
        navigate("/auth");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return <div className="bg-neutral-900/50"></div>;
  }

  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center bg-secondary">
      <div className="flex w-full max-w-xl flex-col gap-2 p-5">
        <div className="flex items-center justify-end">
          <Menu user={user} />
        </div>
        <div className="container flex h-[590px] max-w-xl flex-col rounded-[30px] bg-background p-5 shadow-2xl shadow-gray-950/20">
          <TodoList user={user} />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
