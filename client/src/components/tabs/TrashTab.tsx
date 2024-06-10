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

import { Skeleton } from "../ui/skeleton";
import useSteps from "@/hooks/useSteps";

const TrashTab = () => {
  const { steps, setSteps, loading } = useSteps();

  const deletedSteps = steps.filter((step) => step.deleted_at);

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
              disabled={deletedSteps.length == 0}
              className="flex w-full items-center gap-[6px] px-2 transition-all"
              onClick={() => {
                if (deletedSteps.length > 0) {
                  for (const step of deletedSteps) {
                    axios.put(
                      `${import.meta.env.VITE_API_BASE_URL}/api/steps/${
                        step.id
                      }`,
                      {
                        deleted_at: null,
                      },
                    );

                    setSteps((prevTodos) =>
                      prevTodos.map((tdo) => {
                        if (tdo.id === step.id) {
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
              disabled={deletedSteps.length == 0}
              className="flex w-full items-center gap-[6px] px-2 transition-all"
              onClick={async () => {
                const deletedSteps = steps.filter((step) => step.deleted_at);

                if (deletedSteps.length > 0) {
                  setSteps((prevTodos) =>
                    prevTodos.filter((step) => !step.deleted_at),
                  );

                  for (const step of deletedSteps) {
                    await axios.delete(
                      `${import.meta.env.VITE_API_BASE_URL}/api/steps/${
                        step.id
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
      {loading && (
        <div className="flex h-[63dvh] flex-col gap-2">
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
      {!loading && deletedSteps.length == 0 && (
        <div className="flex h-[63dvh] w-full flex-col items-center justify-center gap-3">
          <Trash size={100} strokeWidth={0.7} />
          <p>All Clear</p>
        </div>
      )}
      {!loading && deletedSteps.length != 0 && (
        <div className="flex h-[63dvh] flex-col gap-2 overflow-y-auto overflow-x-clip px-2">
          {steps
            .filter((step) => step.deleted_at)
            .map((step) => (
              <Step key={step.id} step={step} />
            ))}
        </div>
      )}
    </div>
  );
};

export default TrashTab;
