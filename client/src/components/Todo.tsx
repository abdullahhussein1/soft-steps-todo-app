import { Star } from "lucide-react";
import { MoreHorizontalIcon } from "lucide-react";
import { TrashIcon } from "lucide-react";
import axios from "axios";
import EditDialog from "./EditDialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

type Todo = {
  todo_id: number;
  description: string;
  pinned: boolean;
};

type Props = {
  todo: Todo;
};

const Todo = ({ todo }: Props) => {
  const [pinned, setPinned] = useState(todo.pinned);
  const [todoDescription, setTodoDescription] = useState(todo.description);

  return (
    <div
      key={todo.todo_id}
      className="border-[0.2px] p-3 rounded-xl flex items-start justify-between"
    >
      <div className="flex gap-2">
        <input
          className="accent-black self-start mt-[5.5px]"
          type="checkbox"
          name="todo"
          id={String(todo.todo_id)}
        />
        <label
          htmlFor={String(todo.todo_id)}
          className="p-0 flex  leading-6"
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
            pinned
              ? "text-yellow-500 fill-yellow-500  hover:text-yellow-600 hover:fill-yellow-600"
              : "text-slate-500  hover:text-slate-900",
          ].join(" ")}
          onClick={async () => {
            await axios
              .put(`http://localhost:5000/todos/${todo.todo_id}`, {
                pinned: !todo.pinned,
              })
              .then(() => setPinned(!pinned));
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
            <EditDialog
              todo={todo}
              todoDescription={todoDescription}
              setTodoDescription={setTodoDescription}
            />
            <div
              onClick={async () => {
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
