import { useState } from "react";

import Todo from "./Todo";
import axios from "axios";

import { ArrowUpDownIcon } from "lucide-react";
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

const TodosTab = ({ todos, setTodos, isLoaderVisible }: Props) => {
  const [todoInput, setTodoInput] = useState<string>("");
  const [sortByValue, setSortByValue] = useState<string>("dateEdited");

  return (
    <div className="flex flex-col">
      <div className="flex flex-col relative mt-4 h-[440px]">
        <div className="flex justify-between border-b-[2px] h-12 items-center">
          <h1 className="font-bold text-lg">Todos</h1>
          <Select
            defaultValue="dateEdited"
            onValueChange={(value) => setSortByValue(value)}
          >
            <SelectTrigger className="flex border-none gap-[6px] w-20 h-7 items-center  px-2 rounded-full transition-all">
              <p className="whitespace-nowrap text-xs">Sort By</p>
              <div>
                <ArrowUpDownIcon size={13} />
              </div>
            </SelectTrigger>
            <SelectContent className="flex flex-col w-fit p-2 rounded-xl">
              <SelectGroup>
                <SelectItem value="dateEdited">Date Edited</SelectItem>
                <SelectItem value="dateCreated">Date Created</SelectItem>
                <SelectItem value="title">Title</SelectItem>
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
          <div className=" w-full h-16 bg-gradient-to-t from-background via-background to-transparent absolute bottom-2 z-10"></div>
        </div>
      </div>
      <div className="flex gap-2">
        <Input
          type="text"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          placeholder={`Add todo`}
          className="rounded-full bg-background border-[0.5px]"
        />
        <Button
          className="rounded-full bg-primary"
          onMouseUp={async (e) => {
            e.preventDefault();
            setTodoInput("");
            const newTodo = await axios.post(
              "https://todo-app-avvn.onrender.com/todos",
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
    </div>
  );
};

export default TodosTab;
