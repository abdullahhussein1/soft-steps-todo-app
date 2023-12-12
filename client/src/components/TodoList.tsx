import { Oval } from "react-loader-spinner";
import Todo from "./Todo";
import axios from "axios";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TodoType = {
  todo_id: number;
  description: string;
  pinned: boolean;
  completed: boolean;
};

type Props = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  isLoaderVisible: boolean;
};

const TodoList = ({ todos, setTodos, isLoaderVisible }: Props) => {
  return (
    <Tabs defaultValue="Todos" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Todos">Todos</TabsTrigger>
        <TabsTrigger value="History">History</TabsTrigger>
        <TabsContent value="Todos" className="flex flex-col gap-2 col-span-full">
        <h1 className="font-bold text-lg border-b-[2px] mb-2 mt-4">todos</h1>
          <Oval
            height={30}
            width={30}
            visible={isLoaderVisible}
            color="blue"
            wrapperClass="flex items-center justify-center mt-20"
            ariaLabel="oval-loading"
            secondaryColor="gray"
            strokeWidth={5}
            strokeWidthSecondary={5}
          />
          {todos
            .filter((todo) => todo.pinned && !todo.completed)
            .map((todo) => (
              <Todo
                key={todo.todo_id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
          {todos
            .filter((todo) => !todo.pinned && !todo.completed)
            .map((todo) => (
              <Todo
                key={todo.todo_id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
        </TabsContent>
        <TabsContent value="History" className="flex flex-col w-full gap-2 col-span-full">
          <div className="flex justify-between border-b-[2px] mt-4 mb-2 items-center ">
            <h1 className="font-bold text-lg  ">history</h1>
            <button
              className="hover:bg-red-50  m-1 text-slate-500 px-2 rounded-lg hover:text-red-500 transition-colors h-7"
              onClick={() => {
                {
                  todos
                    .filter((todo) => todo.completed)
                    .forEach(async (todo) => {
                      setTodos(todos.filter((todo) => !todo.completed));
                      await axios.delete(
                        `http://localhost:5000/todos/${todo.todo_id}`
                      );
                    });
                }
              }}
            >
              clear all
            </button>
          </div>
          {todos
            .filter((todo) => todo.completed)
            .map((todo) => (
              <Todo
                key={todo.todo_id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
        </TabsContent>
      </TabsList>
    </Tabs>
  );
};

export default TodoList;
