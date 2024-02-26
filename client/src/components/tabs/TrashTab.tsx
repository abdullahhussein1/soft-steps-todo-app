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
      <div className="flex h-12 items-center justify-between border-b-[2px]">
        <h1 className="text-lg font-bold">Trash</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full transition-colors hover:bg-border/50">
            <div className="p-2">
              <MoreHorizontal size={20} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex w-fit flex-col rounded-xl">
            <DropdownMenuItem
              className="flex w-full items-center gap-[6px] px-2 transition-all focus:bg-green-400/10 focus:text-green-500"
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
                      },
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
                      }),
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
              className="flex w-full items-center gap-[6px] px-2 transition-all focus:bg-red-400/10 focus:text-red-500"
              onClick={async () => {
                const deletedTodos = todos.filter((todo) => todo.deleted_at);

                if (deletedTodos.length > 0) {
                  setTodos((prevTodos) =>
                    prevTodos.filter((todo) => !todo.deleted_at),
                  );

                  for (const todo of deletedTodos) {
                    await axios.delete(
                      `${import.meta.env.VITE_API_BASE_URL}/api/todos/${
                        todo.id
                      }`,
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
      <div className="flex flex-col gap-2 overflow-y-auto overflow-x-clip px-2">
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
