import axios from "axios";
import { useEffect, useState } from "react";

import TodosTab from "./TodosTab";
import CompletedTab from "./CompletedTab";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@supabase/supabase-js";

import TodoType from "@/types/TodoType";

type props = {
  user: User | null;
};

const TodoList = ({ user }: props) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(true);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/todos`
      );
      const result = response.data;
      setIsLoaderVisible(false);
      setTodos(result);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Tabs defaultValue="Todos">
      <TabsList className="grid w-full grid-cols-2 rounded-full">
        <TabsTrigger value="Todos" className="rounded-full">
          Todos
        </TabsTrigger>
        <TabsTrigger value="Completed" className="rounded-full">
          Completed
        </TabsTrigger>
        <TabsContent value="Todos" className="col-span-full m-0">
          <TodosTab
            todos={todos}
            setTodos={setTodos}
            isLoaderVisible={isLoaderVisible}
          />
        </TabsContent>
        <TabsContent value="Completed" className=" col-span-full m-0">
          <CompletedTab todos={todos} setTodos={setTodos} />
        </TabsContent>
      </TabsList>
    </Tabs>
  );
};

export default TodoList;
