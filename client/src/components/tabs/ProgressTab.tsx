// import { BarChart3Icon } from "lucide-react";

import StepType from "@/types/StepType";
import { PieChart, Pie, Cell } from "recharts";

type props = {
  steps: StepType[];
};

const ProgressTab = ({ steps }: props) => {
  const data = [
    { name: "steps", value: steps.length },
    { name: "completed", value: 300 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="flex flex-col gap-2">
      <h1 className="flex h-12 items-center border-b-[2px] text-lg font-bold">
        Progress
      </h1>
      {/* <div className="flex h-[335px] w-full flex-col items-center justify-center gap-3">
        <BarChart3Icon size={100} strokeWidth={0.7} />
        <p>ProgressTab</p>
      </div> */}
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default ProgressTab;
