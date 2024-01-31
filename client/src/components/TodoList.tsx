import axios from "axios";
import { useEffect, useState } from "react";

import TodosTab from "./TodosTab";
import CompletedTab from "./CompletedTab";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TodoType = {
  id: number;
  user_id: string;
  task: string;
  note: string;
  priority: "none" | "low" | "medium" | "high";
  location?: string;
  attachment?: string;
  is_complete: boolean;
  is_pin: boolean;
  created_at: Date;
  updated_at: Date;
  remind_at: Date;
};

const TodoList = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(true);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://todo-app-avvn.onrender.com/todos"
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
