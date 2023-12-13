import { Oval } from "react-loader-spinner";
import Todo from "./Todo";
import axios from "axios";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TodoType = {
  id: number;
  title: string;
  pinned: boolean;
  completed: boolean;
};

type Props = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  isLoaderVisible: boolean;
};

const TodoList = ({ todos, setTodos, isLoaderVisible }: Props) => {
  const [todoInput, setTodoInput] = useState<string>("");

  return (
    <Tabs defaultValue="Todos">
      <TabsList className="grid w-full grid-cols-2  rounded-xl">
        <TabsTrigger value="Todos" className="rounded-lg ">
          Todos
        </TabsTrigger>
        <TabsTrigger value="History" className="rounded-lg">
          History
        </TabsTrigger>
        <TabsContent
          value="Todos"
          className="flex flex-col justify-start col-span-full "
        >
          <div className="flex flex-col relative h-[440px]">
            <h1 className="font-bold text-lg border-b-[2px]  mt-4">todos</h1>
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
            <div className="flex p-2  flex-col gap-2 h-[350px] overflow-y-auto overflow-x-clip">
              {todos
                .filter((todo) => todo.pinned && !todo.completed)
                .map((todo) => (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    todos={todos}
                    setTodos={setTodos}
                  />
                ))}
              {todos
                .filter((todo) => !todo.pinned && !todo.completed)
                .map((todo) => (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    todos={todos}
                    setTodos={setTodos}
                  />
                ))}
              <div className=" w-full h-16 bg-gradient-to-t from-white via-white to-transparent absolute bottom-2 z-10"></div>
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              placeholder={`Add todo`}
              className="rounded-xl  border-[0.5px]"
            />
            <Button
              className="rounded-xl bg-blue-700 hover:bg-blue-800"
              onMouseUp={async (e) => {
                e.preventDefault();
                setTodoInput("");
                const newTodo = await axios.post(
                  "http://localhost:5000/todos",
                  {
                    title: todoInput,
                  }
                );
                setTodos([...todos, newTodo.data]);
              }}
            >
              Add
            </Button>
          </div>
          {/* <AddTodoDialog todos={todos} setTodos={setTodos} /> */}
        </TabsContent>
        <TabsContent
          value="History"
          className="flex flex-col w-full gap-2 h-[460px]  col-span-full  relative"
        >
          <div className="flex justify-between  border-b-[2px]   items-center ">
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
                        `http://localhost:5000/todos/${todo.id}`
                      );
                    });
                }
              }}
            >
              clear all
            </button>
          </div>
          <div className="flex flex-col gap-2 overflow-x-clip overflow-y-auto px-2 ">
            {todos
              .filter((todo) => todo.completed)
              .map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                />
              ))}
            <div className=" w-full h-16 bg-gradient-to-t from-white via-white to-transparent absolute bottom-0"></div>
          </div>
        </TabsContent>
      </TabsList>
    </Tabs>
  );
};

export default TodoList;
