import { useState } from "react";
import axios from "axios";
import EditTodoDialog from "./EditTodoDialog";
import { Star } from "lucide-react";

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
  todo: TodoType;
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const Todo = ({ todo, todos, setTodos }: Props) => {
  const [isPinned, setIsPinned] = useState<boolean>(todo.pinned);
  const [todoTitle, setTodoTitle] = useState<string>(todo.title);
  const [todoNote, setTodoNote] = useState(todo.note);
  const [isChecked, setIsChecked] = useState<boolean>(todo.completed);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      key={todo.id}
      className={[
        "shrink-0 border-[0.2px] p-3 rounded-xl opacity-100 flex  skew-y-0 justify-between  overflow-clip",
        isPinned && "bg-slate-50",
        isChecked &&
          !todo.completed &&
          "delay-1000 translate-x-48 duration-700 transition-all",
      ].join(" ")}
    >
      {/* TODO - add date and show */}
      <div
        className={[
          "flex gap-2 flex-auto",
          isChecked &&
            !todo.completed &&
            "delay-1000 translate-x-48 duration-700 transition-all",
        ].join(" ")}
      >
        <input
          className={
            "accent-gray-500 cursor-pointer flex-initial  self-start mt-[5.5px]"
          }
          type="checkbox"
          checked={isChecked}
          onChange={async () => {
            await axios
              .put(`http://localhost:5000/todos/${todo.id}`, {
                completed: !todo.completed,
              })
              .then(() => {
                const mapTodos = todos.map((tdo) => {
                  if (tdo.id == todo.id) {
                    return {
                      ...tdo,
                      completed: !tdo.completed,
                      pinned: false,
                    };
                  }
                  return tdo;
                });
                if (!todo.completed) {
                  setTimeout(() => setTodos(mapTodos), 1200);
                } else {
                  setTodos(mapTodos);
                }
              });
            setIsChecked(!isChecked);
          }}
          name="todo"
        />
        <label
          className={[
            "p-0 flex cursor-pointer flex-auto leading-6",
            isChecked && "line-through text-gray-500",
          ].join(" ")}
          key={todo.id}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          {todoTitle}
        </label>
      </div>
      <EditTodoDialog
        todo={todo}
        todoTitle={todoTitle}
        setTodoTitle={setTodoTitle}
        todoNote={todoNote}
        setTodoNote={setTodoNote}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="flex gap-1 flex-initial mt-[5px] self-start">
        <Star
          size={15}
          className={[
            " transition-colors cursor-pointer duration-300",
            isChecked
              ? "hidden"
              : isPinned
              ? "text-yellow-500 fill-yellow-500  hover:text-yellow-600 hover:fill-yellow-600"
              : "text-slate-500  hover:text-slate-900",
          ].join(" ")}
          onClick={async () => {
            await axios
              .put(`http://localhost:5000/todos/${todo.id}`, {
                pinned: !todo.pinned,
              })
              .then(() => {
                const mapTodos = todos.map((tdo) => {
                  if (tdo.id == todo.id) {
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
        {/* <Popover>
          <PopoverTrigger>
            <MoreHorizontalIcon
              size={16}
              className=" text-slate-500 hover:text-slate-900 transition-colors duration-300 "
            />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col  w-fit p-2 rounded-xl">
            <div
              onClick={async () => {
                setTodos(todos.filter((curr) => curr.id != todo.id));
                await axios.delete(`http://localhost:5000/todos/${todo.id}`);
              }}
              className="flex text-slate-600 hover:text-slate-900 cursor-pointer items-center justify-start p-2 gap-2 hover:bg-slate-50 rounded-lg"
            >
              <TrashIcon size={16} />
              <p>Delete</p>
            </div>
          </PopoverContent>
        </Popover> */}
      </div>
    </div>
  );
};

export default Todo;
