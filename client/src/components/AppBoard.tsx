import axios from "axios";
import { useEffect, useState } from "react";
import TodosTab from "./tabs/StepsTab";
import CompletedTab from "./tabs/CompletedTab";
import TrashTab from "./tabs/TrashTab";
import ProgressTab from "./tabs/ProgressTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StepType from "@/types/StepType";
import { PieChartIcon, LayoutList, ListChecks, TrashIcon } from "lucide-react";
import useUser from "@/hooks/useUser";

const AppBoard = () => {
  const { user } = useUser();
  const [steps, setSteps] = useState<StepType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/steps`,
          {
            params: {
              user_id: user?.id,
            },
          },
        );

        const result = response.data;
        setLoading(false);
        setSteps(result);
      } catch (error) {
        console.error("Error fetching steps:", error);
        setLoading(false);
      }
    };

    fetchTodos();
  }, [user?.id]);

  return (
    <Tabs defaultValue="steps">
      <TabsList className="grid w-full grid-cols-4 rounded-full">
        <TabsTrigger value="steps" className="flex gap-2 rounded-full">
          <LayoutList size={16} />
        </TabsTrigger>
        <TabsTrigger value="completed" className="flex gap-2 rounded-full">
          <ListChecks size={16} />
        </TabsTrigger>
        <TabsTrigger value="trash" className="flex gap-2 rounded-full">
          <TrashIcon size={16} />
        </TabsTrigger>
        <TabsTrigger value="progress" className="flex gap-2 rounded-full">
          <PieChartIcon size={16} />
        </TabsTrigger>
        <TabsContent value="steps" className="col-span-full">
          <TodosTab
            steps={steps}
            setSteps={setSteps}
            user={user}
            loading={loading}
          />
        </TabsContent>
        <TabsContent value="completed" className=" col-span-full">
          <CompletedTab steps={steps} setSteps={setSteps} loading={loading} />
        </TabsContent>
        <TabsContent value="trash" className=" col-span-full">
          <TrashTab steps={steps} setSteps={setSteps} loading={loading} />
        </TabsContent>
        <TabsContent value="progress" className=" col-span-full">
          <ProgressTab steps={steps} loading={loading} />
        </TabsContent>
      </TabsList>
    </Tabs>
  );
};

export default AppBoard;
