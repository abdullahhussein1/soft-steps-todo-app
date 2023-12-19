import Todo from "./Todo";
import axios from "axios";

import { useState } from "react";
import { ArrowUpDownIcon } from "lucide-react";
import { Trash } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TodoSkeleton from "./TodoSkeleton";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

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
  const [sortByValue, setSortByValue] = useState<string>("dateEdited");

  return (
    <Tabs defaultValue="Todos">
      <TabsList className="grid w-full grid-cols-2  rounded-full">
        <TabsTrigger value="Todos" className="rounded-full">
          Todos
        </TabsTrigger>
        <TabsTrigger value="Completed" className="rounded-full">
          Completed
        </TabsTrigger>
        <TabsContent value="Todos" className="flex flex-col col-span-full m-0">
          <div className="flex flex-col relative mt-4 h-[440px]">
            <div className="flex justify-between border-b-[2px] h-12 items-center">
              <h1 className="font-bold text-lg">Todos</h1>
              <Select
                defaultValue="dateEdited"
                onValueChange={(value) => setSortByValue(value)}
              >
                <SelectTrigger className="flex border-none gap-[6px] w-20 h-7 items-center hover:bg-slate-50 text-slate-500 px-2 rounded-full hover:text-slate-700 transition-all">
                  <p className="whitespace-nowrap text-xs">Sort By</p>
                  <div>
                    <ArrowUpDownIcon size={13} />
                  </div>
                </SelectTrigger>
                <SelectContent className="flex flex-col text-slate-600 w-fit p-2 rounded-xl">
                  <SelectGroup>
                    <SelectItem value="dateEdited" className="rounded-lg">
                      Date Edited
                    </SelectItem>
                    <SelectItem className="rounded-lg" value="dateCreated">
                      Date Created
                    </SelectItem>
                    <SelectItem className="rounded-lg" value="title">
                      Title
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex p-2  flex-col gap-2 h-[350px] overflow-y-auto overflow-x-clip">
              <TodoSkeleton isLoaderVisible={isLoaderVisible} />
              <TodoSkeleton isLoaderVisible={isLoaderVisible} />
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
                .sort((a, b) => {
                  if (sortByValue == "dateEdited") {
                    return (
                      new Date(
                        b.updated_at != b.created_at ? b.updated_at : 0
                      ).getTime() -
                      new Date(
                        a.updated_at != a.created_at ? a.updated_at : 0
                      ).getTime()
                    );
                  } else if (sortByValue == "dateCreated") {
                    return (
                      new Date(b.created_at).getTime() -
                      new Date(a.created_at).getTime()
                    );
                  } else {
                    return a.title.localeCompare(b.title);
                  }
                })
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
              className="rounded-full border-[0.5px] text-slate-800"
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
          <div className="flex justify-between mt-4 border-b-[2px] h-12 items-center">
            <h1 className="font-bold text-lg">Completed</h1>
            <button
              className="flex gap-[6px] w-20 h-7 items-center hover:bg-red-50 text-slate-500 px-2 rounded-full hover:text-red-500 transition-all"
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
              {/* FIXME: the size of the trash icon is small */}
              <div>
                <Trash size={13} />
              </div>
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
