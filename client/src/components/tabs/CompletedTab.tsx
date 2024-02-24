import Todo from "../Todo";
import axios from "axios";

import { Trash } from "lucide-react";

import TodoType from "@/types/TodoType";

type Props = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const CompletedTab = ({ todos, setTodos }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between border-b-[2px] h-12 items-center">
        <h1 className="font-bold text-lg">Completed</h1>
        <button
          className="flex gap-[6px] w-20 h-7 items-center rounded-full hover:bg-red-400/10 px-2 hover:text-red-500 transition-all"
          onClick={async () => {
            const completedTodos = todos.filter(
              (todo) => todo.is_complete && !todo.deleted_at
            );

            if (completedTodos.length > 0) {
              setTodos((prevTodos) =>
                prevTodos.filter((todo) => !todo.is_complete)
              );

              for (const todo of completedTodos) {
                await axios.put(
                  `${import.meta.env.VITE_API_BASE_URL}/api/todos/${todo.id}`,
                  { deleted_at: new Date() }
                );
                const mapTodos = todos.map((tdo) => {
                  if (tdo.id === todo.id) {
                    return {
                      ...tdo,
                      deleted_at: new Date(),
                    };
                  }
                  return tdo;
                });
                setTodos(mapTodos);
              }
            }
          }}
        >
          <p className="whitespace-nowrap text-xs">Clear All</p>
          <div>
            <Trash size={13} />
          </div>
        </button>
      </div>
      <div className="flex flex-col gap-2 overflow-x-clip overflow-y-auto px-2 ">
        {todos
          .filter((todo) => todo.is_complete && !todo.deleted_at)
          .map((todo) => (
            <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
          ))}
      </div>
    </div>
  );
};

export default CompletedTab;
