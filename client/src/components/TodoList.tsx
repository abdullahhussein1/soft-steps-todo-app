import axios from "axios";
import { useEffect, useState } from "react";
import TodosTab from "./tabs/TodosTab";
import CompletedTab from "./tabs/CompletedTab";
import TrashTab from "./tabs/TrashTab";
import SettingsTab from "./tabs/SettingsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TodoType from "@/types/TodoType";
import UserType from "@/types/UserType";
import { LayoutList, ListChecks, Settings, TrashIcon } from "lucide-react";

type params = {
  user: UserType;
};

const TodoList = ({ user }: params) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(true);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/todos`,
        {
          params: {
            user_id: user?.id,
          },
        }
      );

      const result = response.data;
      setIsLoaderVisible(false);
      setTodos(result);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setIsLoaderVisible(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Tabs defaultValue="todos">
      <TabsList className="grid w-full grid-cols-4 rounded-full">
        <TabsTrigger value="todos" className="flex gap-2 rounded-full">
          <LayoutList size={16} />
        </TabsTrigger>
        <TabsTrigger value="completed" className="flex gap-2 rounded-full">
          <ListChecks size={16} />
        </TabsTrigger>
        <TabsTrigger value="deleted" className="flex gap-2 rounded-full">
          <TrashIcon size={16} />
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex gap-2 rounded-full">
          <Settings size={16} />
        </TabsTrigger>
        <TabsContent value="todos" className="col-span-full">
          <TodosTab
            todos={todos}
            setTodos={setTodos}
            user={user}
            isLoaderVisible={isLoaderVisible}
          />
        </TabsContent>
        <TabsContent value="completed" className=" col-span-full">
          <CompletedTab todos={todos} setTodos={setTodos} />
        </TabsContent>
        <TabsContent value="Completed" className=" col-span-full">
          <CompletedTab todos={todos} setTodos={setTodos} />
        </TabsContent>
        <TabsContent value="deleted" className=" col-span-full">
          <TrashTab todos={todos} setTodos={setTodos} />
        </TabsContent>
        <TabsContent value="settings" className=" col-span-full">
          <SettingsTab todos={todos} setTodos={setTodos} />
        </TabsContent>
      </TabsList>
    </Tabs>
  );
};

export default TodoList;
