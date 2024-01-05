import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  isLoaderVisible: boolean;
};

const TodoSkeleton = ({ isLoaderVisible }: Props) => {
  return (
    <div
      className={[
        "flex items-start animate-pulse border-[0.2px] p-3 rounded-xl space-x-2",
        !isLoaderVisible && "hidden",
      ].join(" ")}
    >
      <Skeleton className="h-[14px] w-[14px] rounded-[3.5px]" />
      <div className="flex-auto space-y-3">
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-2 w-2/5" />
      </div>
      <Skeleton className="h-[14px] w-[14px]" />
    </div>
  );
};

export default TodoSkeleton;
