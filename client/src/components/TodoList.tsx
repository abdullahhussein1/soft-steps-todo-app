import axios from "axios";
import { useEffect, useState } from "react";

import TodosTab from "./TodosTab";
import CompletedTab from "./CompletedTab";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TodoType = {
  id: number;
  title: string;
  note: string;
  pinned: boolean;
  completed: boolean;
  remind_date: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

// const changeFavicon = (link: string): void => {
//   let $favicon = document.querySelector('link[rel="icon"]');
//   // If a <link rel="icon"> element already exists,
//   // change its href to the given link.
//   if ($favicon !== null) {
//     $favicon.href = link;
//     // Otherwise, create a new element and append it to <head>.
//   } else {
//     $favicon = document.createElement("link");
//     $favicon.rel = "icon";
//     $favicon.href = link;
//     document.head.appendChild($favicon);
//   }
// };

const TodoList = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(true);

  const fetchTodos = async () => {
    const result = await axios
      .get("https://todo-app-avvn.onrender.com/todos")
      .then((response) => response.data)
      .then((result) => {
        setIsLoaderVisible(false);
        return result;
      });
    setTodos(result);
  };

  useEffect(() => {
    fetchTodos();
    // changeFavicon("/favicon-red.png");
  }, []);

  return (
    <Tabs defaultValue="Todos">
      <TabsList className="grid w-full grid-cols-2  rounded-full">
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
