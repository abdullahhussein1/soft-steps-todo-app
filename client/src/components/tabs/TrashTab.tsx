import Todo from "../Todo";
import axios from "axios";

import { Trash } from "lucide-react";
import { Undo2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";

import TodoType from "@/types/TodoType";

type Props = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const CompletedTab = ({ todos, setTodos }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between border-b-[2px] h-12 items-center">
        <h1 className="font-bold text-lg">Trash</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-border/50 rounded-full transition-colors">
            <div className="p-2">
              <MoreHorizontal size={20} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col w-fit rounded-xl">
            <DropdownMenuItem
              className="flex gap-[6px] w-full items-center focus:bg-green-400/10 px-2 focus:text-green-500 transition-all"
              onClick={() => {
                const deletedTodos = todos.filter((todo) => todo.deleted_at);

                if (deletedTodos.length > 0) {
                  for (const todo of deletedTodos) {
                    axios.put(
                      `${import.meta.env.VITE_API_BASE_URL}/api/todos/${
                        todo.id
                      }`,
                      {
                        deleted_at: null,
                      }
                    );

                    setTodos((prevTodos) =>
                      prevTodos.map((tdo) => {
                        if (tdo.id === todo.id) {
                          return {
                            ...tdo,
                            deleted_at: null,
                          };
                        }
                        return tdo;
                      })
                    );
                  }
                }
              }}
            >
              <div>
                <Undo2 size={15} />
              </div>
              <p className="whitespace-nowrap">Recover All</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-[6px] w-full items-center focus:bg-red-400/10 px-2 focus:text-red-500 transition-all"
              onClick={async () => {
                const deletedTodos = todos.filter((todo) => todo.deleted_at);

                if (deletedTodos.length > 0) {
                  setTodos((prevTodos) =>
                    prevTodos.filter((todo) => !todo.deleted_at)
                  );

                  for (const todo of deletedTodos) {
                    await axios.delete(
                      `${import.meta.env.VITE_API_BASE_URL}/api/todos/${
                        todo.id
                      }`
                    );
                  }
                }
              }}
            >
              <div>
                <Trash size={15} />
              </div>
              <p className="whitespace-nowrap">Delete All</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-2 overflow-x-clip overflow-y-auto px-2">
        {todos
          .filter((todo) => todo.deleted_at)
          .map((todo) => (
            <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
          ))}
      </div>
    </div>
  );
};

export default CompletedTab;
