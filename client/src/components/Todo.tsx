import { useState } from "react";
import axios from "axios";
import EditTodoDialog from "./EditTodoDialog";
import { Star } from "lucide-react";
import { Calendar } from "lucide-react";
import { format, isThisWeek, isToday, isTomorrow } from "date-fns";

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

  const formatRemindDate = (remindDate: Date) => {
    if (isToday(remindDate)) {
      return "today";
    } else if (isTomorrow(remindDate)) {
      return "tomorrow";
    } else if (isThisWeek(remindDate)) {
      // Use the day of the week for other days within this week
      return format(remindDate, "EEEE");
    } else {
      // Show the full date for dates outside this week
      return format(remindDate, "MM/dd/yyyy");
    }
  };

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
              .then(async () => {
                if (!todo.completed) {
                  setTimeout(
                    () =>
                      setTodos((todos) =>
                        todos.map((tdo) => {
                          if (tdo.id == todo.id) {
                            return {
                              ...tdo,
                              completed: !tdo.completed,
                              pinned: false,
                            };
                          }
                          return tdo;
                        })
                      ),
                    1200
                  );
                } else {
                  setTodos((todos) =>
                    todos.map((tdo) => {
                      if (tdo.id == todo.id) {
                        return {
                          ...tdo,
                          completed: !tdo.completed,
                          pinned: false,
                        };
                      }
                      return tdo;
                    })
                  );
                }
              });
            setIsChecked(!isChecked);
          }}
          name="todo"
        />
        <div
          className="flex flex-col cursor-pointer flex-auto gap-2"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <p
            className={[
              "p-0 flex text-slate-700 flex-auto leading-6",
              isChecked && "line-through text-gray-500",
            ].join(" ")}
            key={todo.id}
          >
            {todoTitle}
          </p>
          {!todo.completed && (
            <div className="flex gap-1">
              {todo.remind_date && (
                <div className="flex items-center gap-[3px] text-xs">
                  <Calendar size={12} />
                  <p>
                    {/* {formatDistanceToNow(new Date(todo.remind_date), {
                      addSuffix: true,
                    })} */}
                    {formatRemindDate(new Date(todo.remind_date))}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
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
