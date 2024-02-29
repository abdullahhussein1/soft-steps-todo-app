// import { BarChart3Icon } from "lucide-react";

import useTheme from "@/hooks/useTheme";
import StepType from "@/types/StepType";
import { BarChart3Icon } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

type props = {
  steps: StepType[];
};

const ProgressTab = ({ steps }: props) => {
  const { theme } = useTheme();

  const NotCompletedTodos = steps.filter(
    (todo) => !todo.is_complete && !todo.deleted_at,
  );
  const completedTodos = steps.filter(
    (todo) => todo.is_complete && !todo.deleted_at,
  );

  const data = [
    { name: "steps", value: NotCompletedTodos.length },
    { name: "completed", value: completedTodos.length },
  ];

  const themeColors: { [key: string]: string[] } = {
    blue: ["#69A3FF", "#2962FF"],
    "blue-dark": ["#001E3C", "#0044CC"],
    red: ["#FF7171", "#FF3D67"],
    "red-dark": ["#9B1C31", "#D32F2F"],
    green: ["#6EE7B7", "#00BFA5"],
    "green-dark": ["#003D33", "#00897B"],
    orange: ["#FFA47C", "#FF6F3C"],
    "orange-dark": ["#B24700", "#E65100"],
    neutral: ["#CED4DA", "#495057"],
    "neutral-dark": ["#2E353D", "#8B959E"],
    purple: ["#B198D4", "#6F05E1"],
    "purple-dark": ["#3A0CA3", "#7E57C2"],
    yellow: ["#FFD95B", "#FFC12E"],
    "yellow-dark": ["#FFAB00", "#FFD600"],
  };

  const themeKey = theme.toLowerCase();

  const COLORS = themeColors[themeKey];

  return (
    <div className="flex flex-col gap-2">
      <h1 className="flex h-12 items-center border-b-[2px] text-lg font-bold">
        Progress
      </h1>
      {!steps.length && (
        <div className="flex h-[335px] w-full flex-col items-center justify-center gap-3">
          <BarChart3Icon size={100} strokeWidth={0.7} />
          <p>No Data to Analysis</p>
        </div>
      )}
      <div className="flex flex-col items-center justify-center self-center justify-self-center">
        <PieChart width={730} height={350}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            fill="#82ca9d"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div className="flex gap-5">
          <div className="flex items-center gap-1">
            <div
              className="h-3 w-3 rounded-full"
              style={{ background: COLORS[1] }}
            ></div>
            <p>completed</p>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="h-3 w-3 rounded-full"
              style={{ background: COLORS[0] }}
            ></div>
            <p>not completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTab;
