// import { BarChart3Icon } from "lucide-react";

import useTheme from "@/hooks/useTheme";
import StepType from "@/types/StepType";
import { PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

type props = {
  steps: StepType[];
};

const ProgressTab = ({ steps }: props) => {
  const { theme } = useTheme();

  const notCompletedTodos = steps.filter((todo) => !todo.is_complete);
  const completedTodos = steps.filter((todo) => todo.is_complete);

  const data = [
    { name: "steps", value: notCompletedTodos.length },
    { name: "completed", value: completedTodos.length },
  ];

  const themeColors: { [key: string]: string[] } = {
    blue: ["#2563eb55", "#2563ebee"],
    "blue-dark": ["#2563eb55", "#2563ebee"],
    red: ["#dc262655", "#dc2626cc"],
    "red-dark": ["#dc262655", "#dc2626ee"],
    green: ["#16a34a55", "#16a34aee"],
    "green-dark": ["#16a34a55", "#16a34aee"],
    orange: ["#f9731666", "#f97316ee"],
    "orange-dark": ["#f9731655", "#f97316ee"],
    neutral: ["#00000955", "#000009ee"],
    "neutral-dark": ["#fffff955", "#fffff9ee"],
    purple: ["#7c3aed66", "#7c3aedee"],
    "purple-dark": ["#7c3aed55", "#7c3aedee"],
    yellow: ["#facc15aa", "#facc15dd"],
    "yellow-dark": ["#facc1577", "#facc15ee"],
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
          <PieChartIcon size={100} strokeWidth={0.7} />
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
            label
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                strokeWidth={0}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div className="flex gap-5">
          <div className="flex items-center gap-1">
            <div
              className="h-3 w-3 rounded-full"
              style={{ background: COLORS[0] }}
            ></div>
            <p>Not completed</p>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="h-3 w-3 rounded-full"
              style={{ background: COLORS[1] }}
            ></div>
            <p>Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTab;
