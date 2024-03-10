import { useState } from "react";
import axios from "axios";
import EditStepModal from "./EditStepModal";
import {
  ArrowUpWideNarrow,
  Calendar,
  MapPin,
  PencilLine,
  Pin,
  PinIcon,
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
  step: StepType;
  steps: StepType[];
  setSteps: React.Dispatch<React.SetStateAction<StepType[]>>;
};

const Step = ({ step, steps, setSteps }: Props) => {
  const [isPinned, setIsPinned] = useState<boolean>(step.is_pin);
  const [isChecked, setIsChecked] = useState<boolean>(step.is_complete);
  const [isOpen, setIsOpen] = useState(false);

  const isRemindDatePassed =
    new Date(step.remind_at) < new Date() && !isToday(new Date(step.remind_at));

  const formatRemindDate = (remindDate: Date) => {
    if (isToday(remindDate)) {
      return "today";
    } else if (isRemindDatePassed) {
      return formatDistanceToNow(new Date(step.remind_at), {
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
      key={step.id}
      className={[
        "flex shrink-0 justify-between overflow-clip rounded-xl border-[0.7px]  p-3",
        isPinned && !step.is_complete && !step.deleted_at && "bg-secondary",
        isChecked &&
          !step.is_complete &&
          !step.deleted_at &&
          "translate-x-48 transition-all delay-1000 duration-700",
      ].join(" ")}
    >
      <div
        className={[
          "flex flex-auto items-start gap-2",
          isChecked &&
            !step.is_complete &&
            !step.deleted_at &&
            "translate-x-48 transition-all delay-1000 duration-700",
        ].join(" ")}
      >
        <Checkbox
          className={["accent-foreground", step.deleted_at && "hidden"].join(
            " ",
          )}
          checked={isChecked}
          onCheckedChange={() => {
            axios.put(
              `${import.meta.env.VITE_API_BASE_URL}/api/steps/${step.id}`,
              {
                is_complete: !step.is_complete,
              },
            );
            if (!step.is_complete) {
              setTimeout(
                () =>
                  setSteps((prevTodos) =>
                    prevTodos.map((tdo) => {
                      if (tdo.id === step.id) {
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
                  if (tdo.id === step.id) {
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
          name="step"
        />
        <div className={["flex flex-auto flex-col gap-2"].join(" ")}>
          <p
            className={[
              "flex-auto leading-none text-foreground",
              isChecked &&
                !step.deleted_at &&
                "text-foreground/80 line-through",
              step.deleted_at && "text-foreground/50",
            ].join(" ")}
            key={step.id}
          >
            {step.task}
          </p>
          {!step.is_complete && !step.deleted_at && step.note && (
            <div
              className={[
                " text-[10px] leading-none text-foreground/70",
              ].join()}
            >
              {step.note.length < 20
                ? step.note
                : step.note.slice(0, 20) + "..."}
            </div>
          )}
          {(step.note ||
            step.is_pin ||
            step.location ||
            step.remind_at ||
            step.priority !== "none") &&
            !step.is_complete &&
            !step.deleted_at && (
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  {step.remind_at && (
                    <div
                      className={[
                        "flex items-center gap-1 text-xs leading-none text-foreground/70",
                        isRemindDatePassed && "text-red-500",
                      ].join(" ")}
                    >
                      <Calendar size={13} />
                      <p className="text-[10px]">
                        {formatRemindDate(new Date(step.remind_at))}
                      </p>
                    </div>
                  )}
                  {step.is_pin && (
                    <div
                      className={[
                        "flex items-center gap-1 text-xs leading-none text-foreground/70",
                      ].join(" ")}
                    >
                      <PinIcon size={13} />
                    </div>
                  )}
                  {step.note && (
                    <div
                      className={[
                        "flex items-center gap-1 text-xs leading-none text-foreground/70",
                      ].join(" ")}
                    >
                      <PencilLine size={13} />
                    </div>
                  )}
                  {step.location && (
                    <div
                      className={[
                        "flex items-center gap-1 text-xs leading-none text-foreground/70",
                      ].join(" ")}
                    >
                      <MapPin size={13} />
                    </div>
                  )}
                  {step.priority !== "none" && (
                    <div
                      className={[
                        "flex items-center gap-1 text-xs leading-none text-foreground/70",
                      ].join(" ")}
                    >
                      <ArrowUpWideNarrow size={13} />
                    </div>
                  )}
                </div>
                {step.priority !== "none" && (
                  <div
                    className={[
                      "flex items-center gap-1 text-xs leading-none text-foreground/70",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "rounded-full px-2 py-1 text-[10px] font-semibold",
                        step.priority === "low" &&
                          "bg-yellow-400/20 text-yellow-500",
                        step.priority === "medium" &&
                          "bg-orange-400/20 text-orange-500",
                        step.priority === "high" &&
                          "bg-red-400/20 text-red-500",
                      ].join(" ")}
                    >
                      {step.priority}
                    </div>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
      <EditStepModal
        step={step}
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
              (isChecked || step.deleted_at) && "hidden",
            ].join(" ")}
            onClick={() => {
              axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/steps/${step.id}`,
                {
                  is_pin: !step.is_pin,
                },
              );
              const mapSteps = steps.map((tdo) => {
                if (tdo.id === step.id) {
                  return {
                    ...tdo,
                    is_pin: !tdo.is_pin,
                  };
                }
                return tdo;
              });
              setSteps(mapSteps);
              setIsPinned(!isPinned);
            }}
          >
            <Pin size={15} className={[isPinned && "fill-current"].join()} />
            <p>{isPinned ? "Unpin" : "Pin"}</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={[
              "flex gap-2",
              (isChecked || step.deleted_at) && "hidden",
            ].join(" ")}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <Edit size={15} />
            <p>Edit</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={["hidden", step.deleted_at && "flex gap-2"].join(" ")}
            onClick={() => {
              axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/steps/${step.id}`,
                {
                  deleted_at: null,
                },
              );
              const mapSteps = steps.map((tdo) => {
                if (tdo.id === step.id) {
                  return {
                    ...tdo,
                    deleted_at: null,
                  };
                }
                return tdo;
              });
              setSteps(mapSteps);
            }}
          >
            <Undo2 size={15} />
            <p>Recover</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={["flex gap-2"].join(" ")}
            color="blue"
            onClick={() => {
              axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/steps/${step.id}`,
                {
                  deleted_at: new Date(),
                },
              );
              const mapSteps = steps.map((tdo) => {
                if (tdo.id === step.id) {
                  return {
                    ...tdo,
                    deleted_at: new Date(),
                  };
                }
                return tdo;
              });
              setSteps(mapSteps);
            }}
          >
            <Trash size={15} />
            <p>{step.deleted_at ? "Delete" : "Remove"}</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Step;
