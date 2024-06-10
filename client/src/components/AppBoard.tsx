import TodosTab from "./tabs/StepsTab";
import CompletedTab from "./tabs/CompletedTab";
import TrashTab from "./tabs/TrashTab";
import ProgressTab from "./tabs/ProgressTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChartIcon, LayoutList, ListChecks, TrashIcon } from "lucide-react";

const AppBoard = () => {
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
          <TodosTab />
        </TabsContent>
        <TabsContent value="completed" className="col-span-full">
          <CompletedTab />
        </TabsContent>
        <TabsContent value="trash" className="col-span-full">
          <TrashTab />
        </TabsContent>
        <TabsContent value="progress" className="col-span-full">
          <ProgressTab />
        </TabsContent>
      </TabsList>
    </Tabs>
  );
};

export default AppBoard;
