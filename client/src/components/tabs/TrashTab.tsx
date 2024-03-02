import Step from "../Step";
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

import StepType from "@/types/StepType";
import { Skeleton } from "../ui/skeleton";

type Props = {
  steps: StepType[];
  setSteps: React.Dispatch<React.SetStateAction<StepType[]>>;
  isLoaderVisible: boolean;
};

const TrashTab = ({ steps, setSteps, isLoaderVisible }: Props) => {
  const deletedTodos = steps.filter((todo) => todo.deleted_at);

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
                if (deletedTodos.length > 0) {
                  for (const todo of deletedTodos) {
                    axios.put(
                      `${import.meta.env.VITE_API_BASE_URL}/api/steps/${
                        todo.id
                      }`,
                      {
                        deleted_at: null,
                      },
                    );

                    setSteps((prevTodos) =>
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
                const deletedTodos = steps.filter((todo) => todo.deleted_at);

                if (deletedTodos.length > 0) {
                  setSteps((prevTodos) =>
                    prevTodos.filter((todo) => !todo.deleted_at),
                  );

                  for (const todo of deletedTodos) {
                    await axios.delete(
                      `${import.meta.env.VITE_API_BASE_URL}/api/steps/${
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
      {isLoaderVisible && (
        <div className="flex h-96 flex-col gap-2">
          <div
            className={[
              "flex animate-pulse items-start space-x-2 rounded-xl border-[0.7px] p-3",
            ].join(" ")}
          >
            <Skeleton className="h-[14px] w-[14px] rounded-full" />
            <div className="flex-auto space-y-3">
              <Skeleton className="h-4 w-11/12" />
            </div>
          </div>
          <div
            className={[
              "flex animate-pulse items-start space-x-2 rounded-xl border-[0.7px] p-3",
            ].join(" ")}
          >
            <Skeleton className="h-[14px] w-[14px] rounded-full" />
            <div className="flex-auto space-y-3">
              <Skeleton className="h-4 w-11/12" />
            </div>
          </div>
        </div>
      )}
      {!isLoaderVisible && deletedTodos.length == 0 && (
        <div className="flex h-[335px] w-full flex-col items-center justify-center gap-3">
          <Trash size={100} strokeWidth={0.7} />
          <p>All Clear</p>
        </div>
      )}
      <div className="flex flex-col gap-2 overflow-y-auto overflow-x-clip px-2">
        {steps
          .filter((todo) => todo.deleted_at)
          .map((todo) => (
            <Step key={todo.id} todo={todo} steps={steps} setSteps={setSteps} />
          ))}
      </div>
    </div>
  );
};

export default TrashTab;
