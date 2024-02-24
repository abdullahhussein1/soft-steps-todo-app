import { useState } from "react";
import Todo from "../Todo";
import axios from "axios";
import { ArrowUpDownIcon } from "lucide-react";
import { Maximize2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TodoSkeleton from "../TodoSkeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import TodoType from "@/types/TodoType";
import UserType from "@/types/UserType";
import AddTodoDialog from "../AddTodoDialog";

type Props = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  user: UserType;
  isLoaderVisible: boolean;
};

const TodosTab = ({ todos, setTodos, user, isLoaderVisible }: Props) => {
  const [todoInput, setTodoInput] = useState<string>("");
  const [isAddDialogShown, setIsAddDialogShown] = useState<boolean>(false);
  const [sortByValue, setSortByValue] = useState<string>("dateEdited");

  return (
    <div className="flex flex-col">
      <div className="flex flex-col relative h-[440px]">
        <div className="flex justify-between border-b-[2px] h-12 items-center">
          <h1 className="font-bold text-lg">Todos</h1>
          <Select
            defaultValue="dateEdited"
            onValueChange={(value) => setSortByValue(value)}
          >
            <SelectTrigger className="flex border-none gap-[6px] hover:bg-border/50 w-20 h-7 items-center  px-2 rounded-full transition-all">
              <p className="whitespace-nowrap text-xs">Sort By</p>
              <div>
                <ArrowUpDownIcon size={13} />
              </div>
            </SelectTrigger>
            <SelectContent className="flex flex-col w-fit rounded-xl text-foreground/80">
              <SelectGroup>
                <SelectItem value="dateEdited">Date Edited</SelectItem>
                <SelectItem value="dateCreated">Date Created</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex p-2 pb-10 flex-col gap-2 h-[360px] overflow-y-auto overflow-x-clip">
          <TodoSkeleton isLoaderVisible={isLoaderVisible} />
          <TodoSkeleton isLoaderVisible={isLoaderVisible} />
          {todos
            .filter((todo) => !todo.is_complete && !todo.deleted_at)
            .sort((a, b) => {
              if (a.is_pin && !b.is_pin) {
                return -1;
              } else if (!a.is_pin && b.is_pin) {
                return 1;
              }

              if (a.is_pin || b.is_pin) return 0;

              if (sortByValue === "dateEdited") {
                return (
                  new Date(b.updated_at).getTime() -
                  new Date(a.updated_at).getTime()
                );
              } else if (sortByValue === "dateCreated") {
                return (
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
                );
              } else if (sortByValue === "priority") {
                const priorityOrder = { high: 3, medium: 2, low: 1, none: 0 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
              } else {
                return a.task.localeCompare(b.task);
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

          <div className="w-full h-10 bg-gradient-to-t from-background via-background to-transparent absolute bottom-8 z-10"></div>
        </div>
      </div>
      <AddTodoDialog
        todos={todos}
        setTodos={setTodos}
        isOpen={isAddDialogShown}
        setIsOpen={setIsAddDialogShown}
        user={user}
      />
      <div className="flex gap-2">
        <div className="relative flex items-center w-full">
          <Input
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            placeholder="I want to..."
            className="rounded-full text-foreground"
          />
          <div className="absolute right-1 flex rounded-full bg-background cursor-pointer p-2 hover:text-foreground transition-colors items-center justify-center">
            <Maximize2 size={14} onClick={() => setIsAddDialogShown(true)} />
          </div>
        </div>
        <Button
          className="rounded-full bg-primary text-special"
          onMouseUp={async (e) => {
            if (todoInput === "") return;

            e.preventDefault();
            setTodoInput("");
            try {
              const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/todos`,
                {
                  task: todoInput,
                  user_id: user?.id,
                }
              );
              const newTodo = response.data;
              setTodos([...todos, newTodo]);
            } catch (error) {
              console.error("Error adding todo:", error);
            }
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default TodosTab;
