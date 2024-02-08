import Menu from "../components/Menu";
import TodoList from "../components/TodoList";
import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import supabase from "@/supabase/supabase";

const TodoApp = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const navigate = useNavigate();

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
        navigate("/auth");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return <div className="bg-neutral-900/50"></div>;
  }

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
