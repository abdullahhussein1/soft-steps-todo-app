import { Star } from "lucide-react";
import { MoreHorizontalIcon } from "lucide-react";
import { TrashIcon } from "lucide-react";
import axios from "axios";
import EditTodoDialog from "./EditTodoDialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

type TodoType = {
  todo_id: number;
  description: string;
  pinned: boolean;
  completed: boolean;
};

type Props = {
  todo: TodoType;
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const Todo = ({ todo, todos, setTodos }: Props) => {
  const [isPinned, setIsPinned] = useState<boolean>(todo.pinned);
  const [todoDescription, setTodoDescription] = useState<string>(
    todo.description
  );
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div
      key={todo.todo_id}
      className={[
        "border-[0.2px] p-3 rounded-xl flex items-start justify-between",
        isPinned && "bg-slate-50",
      ].join(" ")}
    >
      {/* TODO - add date and show */}
      {/* TODO - add functionality for checkbox */}
      <div className="flex gap-2">
        <input
          className={"accent-gray-500 self-start mt-[5.5px]"}
          type="checkbox"
          checked={isChecked}
          onChange={async () => {
            await axios.put(`http://localhost:5000/todos/${todo.todo_id}`, {
              pinned: !todo.completed,
            });
            setIsChecked(!isChecked);
            setTimeout(() => {
              const mapTodos = todos.filter(
                (tdo) => tdo.todo_id != todo.todo_id
              );
              setTodos(mapTodos);
            }, 2000);
          }}
          name="todo"
          id={String(todo.todo_id)}
        />
        <label
          htmlFor={String(todo.todo_id)}
          className={[
            "p-0 flex leading-6",
            isChecked && "line-through text-gray-500",
          ].join(" ")}
          key={todo.todo_id}
        >
          {todoDescription}
        </label>
      </div>
      <div className="flex gap-1 mt-[5px] self-start">
        <Star
          size={15}
          className={[
            " transition-colors duration-300",
            isChecked
              ? "hidden"
              : isPinned
              ? "text-yellow-500 fill-yellow-500  hover:text-yellow-600 hover:fill-yellow-600"
              : "text-slate-500  hover:text-slate-900",
          ].join(" ")}
          onClick={async () => {
            await axios
              .put(`http://localhost:5000/todos/${todo.todo_id}`, {
                pinned: !todo.pinned,
              })
              .then(() => {
                const mapTodos = todos.map((tdo) => {
                  if (tdo.todo_id == todo.todo_id) {
                    return {
                      ...tdo,
                      pinned: !tdo.pinned,
                    };
                  }
                  return tdo;
                });
                setTodos(mapTodos);
              });
            setIsPinned(!isPinned);
          }}
        />
        <Popover>
          <PopoverTrigger>
            <MoreHorizontalIcon
              size={16}
              className=" text-slate-500 hover:text-slate-900 transition-colors duration-300 "
            />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col  w-fit p-2 rounded-xl">
            <EditTodoDialog
              todo={todo}
              todoDescription={todoDescription}
              setTodoDescription={setTodoDescription}
            />
            <div
              onClick={async () => {
                setTodos(todos.filter((curr) => curr.todo_id != todo.todo_id));
                await axios.delete(
                  `http://localhost:5000/todos/${todo.todo_id}`
                );
              }}
              className="flex text-slate-600 hover:text-slate-900 cursor-pointer items-center justify-start p-2 gap-2 hover:bg-slate-50 rounded-lg"
            >
              <TrashIcon size={16} />
              <p>Delete</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Todo;
