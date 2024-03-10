import axios from "axios";

import { CheckCheck, Trash } from "lucide-react";

import StepType from "@/types/StepType";
import Step from "../Step";
import { Skeleton } from "../ui/skeleton";

type Props = {
  steps: StepType[];
  setSteps: React.Dispatch<React.SetStateAction<StepType[]>>;
  loading: boolean;
};

const CompletedTab = ({ steps, setSteps, loading }: Props) => {
  const completedTodos = steps.filter(
    (step) => step.is_complete && !step.deleted_at,
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
                prevTodos.filter((step) => !step.is_complete),
              );

              for (const step of completedTodos) {
                await axios.put(
                  `${import.meta.env.VITE_API_BASE_URL}/api/steps/${step.id}`,
                  { deleted_at: new Date() },
                );
                const mapTodos = steps.map((tdo) => {
                  if (tdo.id === step.id) {
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
      {!loading && completedTodos.length == 0 && (
        <div className="flex h-[63dvh] w-full flex-col items-center justify-center gap-3">
          <CheckCheck size={100} strokeWidth={0.7} />
          <p>All done</p>
        </div>
      )}
      {!loading && completedTodos.length != 0 && (
        <div className="flex h-[63dvh] flex-col gap-2 overflow-y-auto overflow-x-clip px-2 ">
          {steps
            .filter((step) => step.is_complete && !step.deleted_at)
            .map((step) => (
              <Step
                key={step.id}
                step={step}
                steps={steps}
                setSteps={setSteps}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default CompletedTab;
