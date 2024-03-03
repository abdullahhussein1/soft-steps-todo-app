import { useState } from "react";
import Step from "../Step";
import axios from "axios";
import { ArrowUpDownIcon, FootprintsIcon } from "lucide-react";
import { Maximize2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StepSkeleton from "../StepSkeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import StepType from "@/types/StepType";
import UserType from "@/types/UserType";
import NewStepBox from "../NewStepBox";

type Props = {
  steps: StepType[];
  setSteps: React.Dispatch<React.SetStateAction<StepType[]>>;
  user: UserType;
  isLoaderVisible: boolean;
};

const StepsTab = ({ steps, setSteps, user, isLoaderVisible }: Props) => {
  const [stepInput, setStepInput] = useState<string>("");
  const [isAddDialogShown, setIsAddDialogShown] = useState<boolean>(false);
  const [sortByValue, setSortByValue] = useState<string>("dateEdited");

  return (
    <div className="flex flex-col">
      <div className="relative flex flex-col">
        <div className="flex h-12 items-center justify-between border-b-[2px]">
          <h1 className="text-lg font-bold">Steps</h1>
          <Select
            defaultValue="dateEdited"
            onValueChange={(value) => setSortByValue(value)}
          >
            <SelectTrigger className="flex h-7 w-20 items-center gap-[6px] rounded-full border-none  px-2 transition-all hover:bg-border/50">
              <p className="whitespace-nowrap text-xs">Sort By</p>
              <div>
                <ArrowUpDownIcon size={13} />
              </div>
            </SelectTrigger>
            <SelectContent className="flex w-fit flex-col rounded-xl text-foreground/80">
              <SelectGroup>
                <SelectItem value="dateEdited">Date Edited</SelectItem>
                <SelectItem value="dateCreated">Date Created</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex h-[63dvh] flex-col gap-2 overflow-y-auto overflow-x-clip p-2 pb-10 ">
          {steps
            .filter((step) => !step.is_complete && !step.deleted_at)
            .sort((a, b) => {
              if (a.is_pin && !b.is_pin) {
                return -1;
              } else if (!a.is_pin && b.is_pin) {
                return 1;
              }

              if (a.is_pin || b.is_pin) return 0;

              if (sortByValue === "dateEdited") {
                return (
                  new Date(b.updated_at).getTime() -
                  new Date(a.updated_at).getTime()
                );
              } else if (sortByValue === "dateCreated") {
                return (
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
                );
              } else if (sortByValue === "priority") {
                const priorityOrder = { high: 3, medium: 2, low: 1, none: 0 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
              } else {
                return a.task.localeCompare(b.task);
              }
            })
            .map((step) => (
              <Step
                key={step.id}
                step={step}
                steps={steps}
                setSteps={setSteps}
              />
            ))}

          {isLoaderVisible && (
            <div className="flex h-96 flex-col gap-2">
              <StepSkeleton />
              <StepSkeleton />
            </div>
          )}

          {steps.length == 0 && !isLoaderVisible && (
            <div className="flex h-96 w-full flex-col items-center justify-center gap-3">
              <FootprintsIcon size={100} strokeWidth={0.7} />
              <p>Take a new Step</p>
            </div>
          )}

          {steps.filter((step) => !step.is_complete && !step.deleted_at)
            .length == 0 && (
            <div className="flex h-96 w-full flex-col items-center justify-center gap-3">
              <FootprintsIcon size={100} strokeWidth={0.7} />
              <p>Take a new Step</p>
            </div>
          )}

          {steps.length > 0 && (
            <div className="absolute bottom-0 z-10 h-8 w-full bg-gradient-to-t from-background via-background to-transparent"></div>
          )}
        </div>
      </div>
      <NewStepBox
        steps={steps}
        setSteps={setSteps}
        isOpen={isAddDialogShown}
        setIsOpen={setIsAddDialogShown}
        user={user}
      />
      <div className="flex gap-2">
        <div className="relative flex w-full items-center">
          <Input
            type="text"
            value={stepInput}
            onChange={(e) => setStepInput(e.target.value)}
            placeholder="I want to..."
            className="rounded-full text-foreground"
          />
          <div className="absolute right-1 flex cursor-pointer items-center justify-center rounded-full bg-background p-2 transition-colors hover:text-foreground">
            <Maximize2 size={14} onClick={() => setIsAddDialogShown(true)} />
          </div>
        </div>
        <Button
          className="rounded-full bg-primary text-special"
          onMouseUp={async (e) => {
            if (stepInput === "") return;

            e.preventDefault();
            setStepInput("");
            try {
              const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/steps`,
                {
                  task: stepInput,
                  user_id: user?.id,
                },
              );
              const newTodo = response.data;
              setSteps([...steps, newTodo]);
            } catch (error) {
              console.error("Error adding step:", error);
            }
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default StepsTab;
