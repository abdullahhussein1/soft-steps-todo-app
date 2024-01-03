import Todo from "./Todo";
import axios from "axios";

import { Trash } from "lucide-react";

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
};

const CompletedTab = ({ todos, setTodos }: Props) => {
  return (
    <div className="flex flex-col gap-2">
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
                    `https://todo-app-avvn.onrender.com/todos/${todo.id}`
                  );
                });
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
          .filter((todo) => todo.completed)
          .map((todo) => (
            <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
          ))}
      </div>
    </div>
  );
};

export default CompletedTab;
