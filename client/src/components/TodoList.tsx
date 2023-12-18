import { Oval } from "react-loader-spinner";
import Todo from "./Todo";
import axios from "axios";

import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Trash } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

type Props = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  isLoaderVisible: boolean;
};

const TodoList = ({ todos, setTodos, isLoaderVisible }: Props) => {
  const [todoInput, setTodoInput] = useState<string>("");

  return (
    <Tabs defaultValue="Todos">
      <TabsList className="grid w-full grid-cols-2  rounded-full">
        <TabsTrigger value="Todos" className="rounded-full">
          Todos
        </TabsTrigger>
        <TabsTrigger value="Completed" className="rounded-full">
          Completed
        </TabsTrigger>
        <TabsContent value="Todos" className="flex flex-col col-span-full">
          <div className="flex flex-col relative h-[440px]">
            <div className="flex justify-between border-b-[2px] h-12 items-center">
              <h1 className="font-bold text-lg">Todos</h1>
              <Popover>
                <PopoverTrigger asChild className="">
                  <button className="flex gap-2 w-20 h-7 items-center hover:bg-slate-50 text-slate-500 px-2 rounded-full hover:text-slate-700 transition-all">
                    <p className="whitespace-nowrap text-xs">Sort By</p>
                    <ArrowUpDown size={15} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col w-fit p-2 rounded-xl">
                  <div className="flex flex-col gap-1 text-sm">
                    <div>
                      <button className="flex text-slate-600 w-full hover:text-slate-900 items-center justify-start p-2 gap-2 hover:bg-slate-100/80 rounded-lg">
                        Date Edited
                      </button>
                      <button className="flex text-slate-600 w-full hover:text-slate-900 items-center justify-start p-2 gap-2 hover:bg-slate-100/80 rounded-lg">
                        Date Created
                      </button>
                      <button className="flex text-slate-600 w-full hover:text-slate-900 items-center justify-start p-2 gap-2 hover:bg-slate-100/80 rounded-lg">
                        Title
                      </button>
                    </div>
                    <div className="border-[1px] rounded-full"></div>
                    <div className="flex flex-col pt-1 bg-slate-100/80 rounded-xl">
                      <button className="flex text-slate-600 w-full hover:text-slate-900 items-center justify-start p-2 gap-2  rounded-lg">
                        Newest First
                      </button>
                      <button className="flex text-slate-600 w-full hover:text-slate-900 items-center justify-start p-2 gap-2  rounded-lg">
                        Oldest First
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
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
              className="rounded-full border-[0.5px]"
            />
            <Button
              className="rounded-full bg-blue-700 hover:bg-blue-800"
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
        </TabsContent>
        <TabsContent
          value="Completed"
          className="flex flex-col w-full gap-2 m-0 col-span-full"
        >
          <div className="flex justify-between border-b-[2px] h-12 items-center">
            <h1 className="font-bold text-lg">Completed</h1>

            <button
              className="flex gap-2 w-20 h-7 items-center hover:bg-red-50 text-slate-500 px-2 rounded-full hover:text-red-500 transition-all"
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
              <p className="whitespace-nowrap text-xs">Clear All</p>
              <Trash size={15} />
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
          </div>
        </TabsContent>
      </TabsList>
    </Tabs>
  );
};

export default TodoList;
