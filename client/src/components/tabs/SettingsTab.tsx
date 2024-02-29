import { Settings2 } from "lucide-react";

const CompletedTab = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="flex h-12 items-center border-b-[2px] text-lg font-bold">
        Settings
      </h1>
      <div className="flex h-[335px] w-full flex-col items-center justify-center gap-3">
        <Settings2 size={100} strokeWidth={0.7} />
        <p>Settings</p>
      </div>
    </div>
  );
};

export default CompletedTab;
