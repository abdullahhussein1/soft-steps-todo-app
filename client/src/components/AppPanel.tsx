import axios from "axios";
import { useEffect, useState } from "react";
import TodosTab from "./tabs/StepsTab";
import CompletedTab from "./tabs/CompletedTab";
import TrashTab from "./tabs/TrashTab";
import ProgressTab from "./tabs/ProgressTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StepType from "@/types/StepType";
import UserType from "@/types/UserType";
import { PieChartIcon, LayoutList, ListChecks, TrashIcon } from "lucide-react";

type params = {
  user: UserType;
};

const AppPanel = ({ user }: params) => {
  const [steps, setSteps] = useState<StepType[]>([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(true);

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
      setIsLoaderVisible(false);
      setSteps(result);
    } catch (error) {
      console.error("Error fetching steps:", error);
      setIsLoaderVisible(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Tabs defaultValue="steps">
      <TabsList className="grid w-full grid-cols-4 rounded-full">
        <TabsTrigger value="steps" className="flex gap-2 rounded-full">
          <LayoutList size={16} />
        </TabsTrigger>
        <TabsTrigger value="completed" className="flex gap-2 rounded-full">
          <ListChecks size={16} />
        </TabsTrigger>
        <TabsTrigger value="deleted" className="flex gap-2 rounded-full">
          <TrashIcon size={16} />
        </TabsTrigger>
        <TabsTrigger value="statistics" className="flex gap-2 rounded-full">
          <PieChartIcon size={16} />
        </TabsTrigger>
        <TabsContent value="steps" className="col-span-full">
          <TodosTab
            steps={steps}
            setSteps={setSteps}
            user={user}
            isLoaderVisible={isLoaderVisible}
          />
        </TabsContent>
        <TabsContent value="completed" className=" col-span-full">
          <CompletedTab
            steps={steps}
            setSteps={setSteps}
            isLoaderVisible={isLoaderVisible}
          />
        </TabsContent>
        <TabsContent value="deleted" className=" col-span-full">
          <TrashTab
            steps={steps}
            setSteps={setSteps}
            isLoaderVisible={isLoaderVisible}
          />
        </TabsContent>
        <TabsContent value="statistics" className=" col-span-full">
          <ProgressTab steps={steps} isLoaderVisible={isLoaderVisible} />
        </TabsContent>
      </TabsList>
    </Tabs>
  );
};

export default AppPanel;