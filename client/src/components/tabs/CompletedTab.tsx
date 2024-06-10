import axios from "axios";

import { CheckCheck, Trash } from "lucide-react";

import Step from "../Step";
import { Skeleton } from "../ui/skeleton";
import useSteps from "@/hooks/useSteps";

const CompletedTab = () => {
  const { steps, setSteps, loading } = useSteps();

  const completedSteps = steps.filter(
    (step) => step.is_complete && !step.deleted_at,
  );

  const isEmpty =
    steps.filter((step) => step.is_complete && !step.deleted_at).length == 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-12 items-center justify-between border-b-[2px]">
        <h1 className="text-lg font-bold">Completed</h1>
        <button
          disabled={isEmpty}
          className="flex h-7 w-20 items-center gap-[6px] rounded-full px-2 transition-all hover:bg-red-400/10 hover:text-red-500 disabled:text-gray-400/80 disabled:hover:bg-transparent"
          onClick={() => {
            completedSteps.forEach((step) => {
              axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/steps/${step.id}`,
                {
                  deleted_at: new Date(),
                },
              );
            });

            const updatedSteps = steps.map((tdo) => {
              if (tdo.is_complete == true) {
                return {
                  ...tdo,
                  deleted_at: new Date(),
                };
              }
              return tdo;
            });

            setSteps(updatedSteps);
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
      {!loading && completedSteps.length == 0 && (
        <div className="flex h-[63dvh] w-full flex-col items-center justify-center gap-3">
          <CheckCheck size={100} strokeWidth={0.7} />
          <p>All done</p>
        </div>
      )}
      {!loading && completedSteps.length != 0 && (
        <div className="flex h-[63dvh] flex-col gap-2 overflow-y-auto overflow-x-clip px-2 ">
          {steps
            .filter((step) => step.is_complete && !step.deleted_at)
            .map((step) => (
              <Step key={step.id} step={step} />
            ))}
        </div>
      )}
    </div>
  );
};

export default CompletedTab;
