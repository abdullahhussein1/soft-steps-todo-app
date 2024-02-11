import { useState } from "react";
import axios from "axios";
import EditTodoDialog from "./EditTodoDialog";
import { Star } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Trash } from "lucide-react";
import { Edit } from "lucide-react";
import { Calendar } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  format,
  isThisWeek,
  isToday,
  isTomorrow,
  formatDistanceToNow,
} from "date-fns";
import { Checkbox } from "./ui/checkbox";

import TodoType from "@/types/TodoType";

type Props = {
  todo: TodoType;
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const Todo = ({ todo, todos, setTodos }: Props) => {
  const [isPinned, setIsPinned] = useState<boolean>(todo.is_pin);
  const [isChecked, setIsChecked] = useState<boolean>(todo.is_complete);
  const [isOpen, setIsOpen] = useState(false);

  const isRemindDatePassed =
    new Date(todo.remind_at) < new Date() && !isToday(new Date(todo.remind_at));

  const formatRemindDate = (remindDate: Date) => {
    if (isToday(remindDate)) {
      return "today";
    } else if (isRemindDatePassed) {
      return formatDistanceToNow(new Date(todo.remind_at), {
        addSuffix: true,
      });
    } else if (isTomorrow(remindDate)) {
      return "tomorrow";
    } else if (isThisWeek(remindDate)) {
      return format(remindDate, "EEEE");
    } else {
      return format(remindDate, "dd/MM/yyyy");
    }
  };

  return (
    <div
      key={todo.id}
      // draggable={true}
      className={[
        "shrink-0 border-[0.7px] p-3 rounded-xl flex justify-between  overflow-clip",
        isPinned && "bg-secondary",
        isChecked &&
          !todo.is_complete &&
          "delay-1000 translate-x-48 duration-700 transition-all",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-start gap-2 flex-auto",
          isChecked &&
            !todo.is_complete &&
            "delay-1000 translate-x-48 duration-700 transition-all",
        ].join(" ")}
      >
        <Checkbox
          className={"accent-foreground"}
          checked={isChecked}
          onCheckedChange={() => {
            axios.put(
              `${import.meta.env.VITE_API_BASE_URL}/api/todos/${todo.id}`,
              {
                is_complete: !todo.is_complete,
              }
            );
            if (!todo.is_complete) {
              setTimeout(
                () =>
                  setTodos((prevTodos) =>
                    prevTodos.map((tdo) => {
                      if (tdo.id === todo.id) {
                        return {
                          ...tdo,
                          is_complete: !tdo.is_complete,
                          is_pin: false,
                        };
                      }
                      return tdo;
                    })
                  ),
                1200
              );
            } else {
              setTodos((prevTodos) =>
                prevTodos.map((tdo) => {
                  if (tdo.id === todo.id) {
                    return {
                      ...tdo,
                      is_complete: !tdo.is_complete,
                    };
                  }
                  return tdo;
                })
              );
            }
            setIsChecked(!isChecked);
          }}
          name="todo"
        />
        <div
          className={[
            "flex flex-col flex-auto gap-2",
            !todo.is_complete && "cursor-pointer",
          ].join(" ")}
          onClick={() => {
            if (todo.is_complete) return;
            setIsOpen(true);
          }}
        >
          <p
            className={[
              "text-foreground flex-auto leading-none",
              isChecked && "line-through text-foreground/80",
            ].join(" ")}
            key={todo.id}
          >
            {todo.task}
          </p>
          {!todo.is_complete && todo.remind_at && (
            <div
              className={[
                "flex items-center gap-[3px] text-xs text-foreground/70",
                isRemindDatePassed && "text-red-500",
              ].join(" ")}
            >
              <Calendar size={12} />
              <p className="leading-none">
                {formatRemindDate(new Date(todo.remind_at))}
              </p>
            </div>
          )}
        </div>
      </div>
      <EditTodoDialog
        todo={todo}
        todos={todos}
        setTodos={setTodos}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="flex-initial self-start">
          <div className="px-2 pb-2">
            <MoreHorizontal size={16} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col w-fit p-2 rounded-xl">
          <DropdownMenuItem
            className={["flex gap-2", isChecked && "hidden"].join(" ")}
            onClick={() => {
              axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/todos/${todo.id}`,
                {
                  is_pin: !todo.is_pin,
                }
              );
              const mapTodos = todos.map((tdo) => {
                if (tdo.id === todo.id) {
                  return {
                    ...tdo,
                    is_pin: !tdo.is_pin,
                  };
                }
                return tdo;
              });
              setTodos(mapTodos);
              setIsPinned(!isPinned);
            }}
          >
            <Star size={15} className={[isPinned && "fill-current"].join()} />
            <p>{isPinned ? "Unstar" : "Star"}</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={["flex gap-2", isChecked && "hidden"].join(" ")}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <Edit size={15} />
            <p>Edit</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2"
            onClick={() => {
              axios.delete(
                `${import.meta.env.VITE_API_BASE_URL}/api/todos/${todo.id}`
              );
              const filterTodos = todos.filter((tdo) => tdo.id !== todo.id);
              setTodos(filterTodos);
            }}
          >
            <Trash size={15} />
            <p>Delete</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Todo;
