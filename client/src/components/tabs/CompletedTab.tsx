import axios from "axios";

import { CheckCheck, Trash } from "lucide-react";

import StepType from "@/types/StepType";
import Step from "../Step";
import { Skeleton } from "../ui/skeleton";

type Props = {
  steps: StepType[];
  setSteps: React.Dispatch<React.SetStateAction<StepType[]>>;
  isLoaderVisible: boolean;
};

const CompletedTab = ({ steps, setSteps, isLoaderVisible }: Props) => {
  const completedTodos = steps.filter(
    (todo) => todo.is_complete && !todo.deleted_at,
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-12 items-center justify-between border-b-[2px]">
        <h1 className="text-lg font-bold">Completed</h1>
        <button
          className="flex h-7 w-20 items-center gap-[6px] rounded-full px-2 transition-all hover:bg-red-400/10 hover:text-red-500"
          onClick={async () => {
            if (completedTodos.length > 0) {
              setSteps((prevTodos) =>
                prevTodos.filter((todo) => !todo.is_complete),
              );

              for (const todo of completedTodos) {
                await axios.put(
                  `${import.meta.env.VITE_API_BASE_URL}/api/steps/${todo.id}`,
                  { deleted_at: new Date() },
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
              }
            }
          }}
        >
          <p className="whitespace-nowrap text-xs">Clear All</p>
          <div>
            <Trash size={13} />
          </div>
        </button>
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
      {!isLoaderVisible && completedTodos.length == 0 && (
        <div className="flex h-[335px] w-full flex-col items-center justify-center gap-3">
          <CheckCheck size={100} strokeWidth={0.7} />
          <p>All done</p>
        </div>
      )}
      <div className="flex flex-col gap-2 overflow-y-auto overflow-x-clip px-2 ">
        {steps
          .filter((todo) => todo.is_complete && !todo.deleted_at)
          .map((todo) => (
            <Step key={todo.id} todo={todo} steps={steps} setSteps={setSteps} />
          ))}
      </div>
    </div>
  );
};

export default CompletedTab;
