import { useState } from "react";
import axios from "axios";
import EditStepBox from "./EditStepBox";
import {
  ArrowUpWideNarrow,
  Calendar,
  MapPin,
  PencilLine,
  Pin,
  Undo2,
} from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Trash } from "lucide-react";
import { Edit } from "lucide-react";

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

import StepType from "@/types/StepType";

type Props = {
  todo: StepType;
  steps: StepType[];
  setSteps: React.Dispatch<React.SetStateAction<StepType[]>>;
};

const Step = ({ todo, steps, setSteps }: Props) => {
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
      className={[
        "flex  shrink-0 justify-between overflow-clip rounded-xl border-[0.7px]  p-3",
        isPinned && !todo.is_complete && !todo.deleted_at && "bg-secondary",
        isChecked &&
          !todo.is_complete &&
          !todo.deleted_at &&
          "translate-x-48 transition-all delay-1000 duration-700",
      ].join(" ")}
    >
      <div
        className={[
          "flex flex-auto items-start gap-2",
          isChecked &&
            !todo.is_complete &&
            !todo.deleted_at &&
            "translate-x-48 transition-all delay-1000 duration-700",
        ].join(" ")}
      >
        <Checkbox
          className={["accent-foreground", todo.deleted_at && "hidden"].join(
            " ",
          )}
          checked={isChecked}
          onCheckedChange={() => {
            axios.put(
              `${import.meta.env.VITE_API_BASE_URL}/api/steps/${todo.id}`,
              {
                is_complete: !todo.is_complete,
              },
            );
            if (!todo.is_complete) {
              setTimeout(
                () =>
                  setSteps((prevTodos) =>
                    prevTodos.map((tdo) => {
                      if (tdo.id === todo.id) {
                        return {
                          ...tdo,
                          is_complete: !tdo.is_complete,
                          is_pin: false,
                        };
                      }
                      return tdo;
                    }),
                  ),
                1200,
              );
            } else {
              setSteps((prevTodos) =>
                prevTodos.map((tdo) => {
                  if (tdo.id === todo.id) {
                    return {
                      ...tdo,
                      is_complete: !tdo.is_complete,
                    };
                  }
                  return tdo;
                }),
              );
            }
            setIsChecked(!isChecked);
          }}
          name="todo"
        />
        <div className={["flex flex-auto flex-col gap-2"].join(" ")}>
          <p
            className={[
              "flex-auto leading-none text-foreground",
              isChecked &&
                !todo.deleted_at &&
                "text-foreground/80 line-through",
              todo.deleted_at && "text-foreground/50",
            ].join(" ")}
            key={todo.id}
          >
            {todo.task}
          </p>
          {!todo.is_complete && !todo.deleted_at && todo.note && (
            <div
              className={[
                " text-[10px] leading-none text-foreground/70",
              ].join()}
            >
              {todo.note.length < 20
                ? todo.note
                : todo.note.slice(0, 20) + "..."}
            </div>
          )}
          {(todo.note ||
            todo.location ||
            todo.remind_at ||
            todo.priority !== "none") &&
            !todo.is_complete &&
            !todo.deleted_at && (
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  {todo.remind_at && (
                    <div
                      className={[
                        "flex items-center gap-1 text-xs leading-none text-foreground/70",
                        isRemindDatePassed && "text-red-500",
                      ].join(" ")}
                    >
                      <Calendar size={13} />
                      <p className="text-[10px]">
                        {formatRemindDate(new Date(todo.remind_at))}
                      </p>
                    </div>
                  )}
                  {todo.note && (
                    <div
                      className={[
                        "flex items-center gap-1 text-xs leading-none text-foreground/70",
                      ].join(" ")}
                    >
                      <PencilLine size={13} />
                    </div>
                  )}
                  {todo.location && (
                    <div
                      className={[
                        "flex items-center gap-1 text-xs leading-none text-foreground/70",
                      ].join(" ")}
                    >
                      <MapPin size={13} />
                    </div>
                  )}
                  {todo.priority !== "none" && (
                    <div
                      className={[
                        "flex items-center gap-1 text-xs leading-none text-foreground/70",
                      ].join(" ")}
                    >
                      <ArrowUpWideNarrow size={13} />
                    </div>
                  )}
                </div>
                {todo.priority !== "none" && (
                  <div
                    className={[
                      "flex items-center gap-1 text-xs leading-none text-foreground/70",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "rounded-full px-2 py-1 text-[10px] font-semibold",
                        todo.priority === "low" &&
                          "bg-yellow-400/20 text-yellow-500",
                        todo.priority === "medium" &&
                          "bg-orange-400/20 text-orange-500",
                        todo.priority === "high" &&
                          "bg-red-400/20 text-red-500",
                      ].join(" ")}
                    >
                      {todo.priority}
                    </div>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
      <EditStepBox
        todo={todo}
        steps={steps}
        setSteps={setSteps}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="flex-initial self-start">
          <div className="px-2">
            <MoreHorizontal size={16} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex w-fit flex-col rounded-xl">
          <DropdownMenuItem
            className={[
              "flex gap-2",
              (isChecked || todo.deleted_at) && "hidden",
            ].join(" ")}
            onClick={() => {
              axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/steps/${todo.id}`,
                {
                  is_pin: !todo.is_pin,
                },
              );
              const mapTodos = steps.map((tdo) => {
                if (tdo.id === todo.id) {
                  return {
                    ...tdo,
                    is_pin: !tdo.is_pin,
                  };
                }
                return tdo;
              });
              setSteps(mapTodos);
              setIsPinned(!isPinned);
            }}
          >
            <Pin size={15} className={[isPinned && "fill-current"].join()} />
            <p>{isPinned ? "Unpin" : "Pin"}</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={[
              "flex gap-2",
              (isChecked || todo.deleted_at) && "hidden",
            ].join(" ")}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <Edit size={15} />
            <p>Edit</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={[
              "hidden transition-all focus:bg-green-400/10 focus:text-green-500",
              todo.deleted_at && "flex gap-2",
            ].join(" ")}
            onClick={() => {
              axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/steps/${todo.id}`,
                {
                  deleted_at: null,
                },
              );
              const mapTodos = steps.map((tdo) => {
                if (tdo.id === todo.id) {
                  return {
                    ...tdo,
                    deleted_at: null,
                  };
                }
                return tdo;
              });
              setSteps(mapTodos);
            }}
          >
            <Undo2 size={15} />
            <p>Recover</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={[
              "flex gap-2",
              todo.deleted_at &&
                "transition-all focus:bg-red-400/10 focus:text-red-500",
            ].join(" ")}
            color="blue"
            onClick={() => {
              axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/steps/${todo.id}`,
                {
                  deleted_at: new Date(),
                },
              );
              const mapTodos = steps.map((tdo) => {
                if (tdo.id === todo.id) {
                  return {
                    ...tdo,
                    deleted_at: new Date(),
                  };
                }
                return tdo;
              });
              setSteps(mapTodos);
            }}
          >
            <Trash size={15} />
            <p>{todo.deleted_at ? "Delete" : "Remove"}</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Step;
