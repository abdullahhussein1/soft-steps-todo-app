import { Skeleton } from "@/components/ui/skeleton";

const StepSkeleton = () => {
  return (
    <div
      className={[
        "flex animate-pulse items-start space-x-2 rounded-xl border-[0.7px] p-3",
      ].join(" ")}
    >
      <Skeleton className="h-[14px] w-[14px] rounded-full" />
      <div className="flex-auto space-y-3">
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-2 w-2/5" />
      </div>
      <Skeleton className="h-[14px] w-[14px]" />
    </div>
  );
};

export default StepSkeleton;
