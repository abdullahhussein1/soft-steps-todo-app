import { useReducer } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectSeparator,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import {
  ArrowUpWideNarrow,
  Calendar as CalendarIcon,
  MapPin,
  PencilLine,
  CheckSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import UserType from "@/types/UserType";
import useSteps from "@/hooks/useSteps";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
};

type StepState = {
  task?: string | null;
  note?: string | null;
  remind_at?: Date | null;
  priority?: string;
  location?: string;
};

type Action =
  | {
      type: "changed";
      field: keyof StepState;
      value: string | Date | null;
    }
  | { type: "reset" };

function stepReducer(state: StepState, action: Action): StepState {
  switch (action.type) {
    case "changed": {
      return { ...state, [action.field]: action.value };
    }
    case "reset": {
      return initialState;
    }
    default:
      return state;
  }
}

const initialState: StepState = {};

const NewStepModal = ({ isOpen, setIsOpen, user }: Props) => {
  const { dispatch } = useSteps();
  const [step, dispatchStep] = useReducer(stepReducer, initialState);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const resetFields = () => {
    dispatchStep({ type: "reset" });
  };

  const handleAddStep = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(step);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/steps`,
        {
          user_id: user?.id,
          task: step.task,
          note: step.note,
          remind_at: step.remind_at,
          priority: step.priority,
          location: step.location,
        },
      );

      const newStep = response.data;
      dispatch({ type: "added", step: newStep });
      resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  const dialogContent = (
    <div className="mt-3 flex flex-col gap-5">
      <div className="flex flex-col gap-[6px]">
        <label htmlFor="title" className="flex items-center gap-2 font-medium">
          <CheckSquare size={17} />
          <p>Title</p>
        </label>
        <Input
          type="text"
          value={step.task ?? ""}
          placeholder="I want to..."
          onChange={(e) =>
            dispatchStep({
              type: "changed",
              field: "task",
              value: e.target.value,
            })
          }
          className="rounded-xl border-[0.7px]"
          id="title"
        />
      </div>
      <div className="flex flex-col gap-[6px]">
        <label htmlFor="note" className="flex items-center gap-2 font-medium">
          <PencilLine size={17} />
          <p>Note</p>
        </label>
        <Textarea
          value={step.note ?? ""}
          placeholder="Add note"
          onChange={(e) =>
            dispatchStep({
              type: "changed",
              field: "note",
              value: e.target.value,
            })
          }
          className="resize-none rounded-xl border-[0.7px] text-xs text-foreground/60 "
          id="note"
        />
      </div>
      <div className="flex flex-col gap-[6px]">
        <label
          htmlFor="location"
          className="flex items-center gap-2 font-medium"
        >
          <MapPin size={17} />
          <p>Location</p>
        </label>
        <Input
          type="text"
          value={step.location || ""}
          onChange={(e) =>
            dispatchStep({
              type: "changed",
              field: "location",
              value: e.target.value,
            })
          }
          className="rounded-xl border-[0.7px]"
          id="location"
        />
      </div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col">
          <Popover>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  "w-fit justify-start rounded-xl border-none px-3 text-left font-normal",
                  !step.remind_at && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {step.remind_at ? (
                  format(step.remind_at, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={step.remind_at ?? new Date()}
                fromDate={new Date()}
                onSelect={(selectedDate) =>
                  dispatchStep({
                    type: "changed",
                    field: "remind_at",
                    value: selectedDate ?? null,
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col">
          <Select
            defaultValue="none"
            onValueChange={(value) =>
              dispatchStep({ type: "changed", field: "priority", value: value })
            }
          >
            <SelectTrigger
              className={cn(
                "flex w-fit items-center justify-start rounded-xl border-none text-left text-sm font-normal",
              )}
            >
              <div
                className={cn(
                  " w-32 justify-start rounded-xl border-none px-3 text-left font-normal",
                  step.priority === "none" && "text-muted-foreground",
                )}
              >
                <ArrowUpWideNarrow className="mr-2 h-4 w-4" />
                {step.priority !== "none" ? (
                  <SelectValue />
                ) : (
                  <span>Set priority</span>
                )}
              </div>
            </SelectTrigger>
            <SelectContent className="flex w-fit flex-col rounded-xl text-foreground/80">
              <SelectGroup>
                <SelectItem value="high">high</SelectItem>
                <SelectItem value="medium">medium</SelectItem>
                <SelectItem value="low">low</SelectItem>
                <SelectSeparator />
                <SelectItem value="none">none</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
        <DialogContent className="sm:rounded-3xl">
          <DialogHeader>
            <DialogTitle>New Step</DialogTitle>
          </DialogHeader>
          {dialogContent}
          <DialogFooter>
            <DialogClose asChild>
              <div className="flex flex-col items-center gap-1 sm:flex-row">
                <Button
                  className="w-full flex-auto rounded-full bg-primary text-special sm:order-2"
                  onMouseUp={handleAddStep}
                >
                  Add
                </Button>
                <Button className="w-24 rounded-full bg-transparent text-foreground hover:bg-foreground/5 sm:order-1">
                  Close
                </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
        <DrawerContent className="rounded-t-3xl px-4">
          <DrawerHeader>
            <DrawerTitle>New Step</DrawerTitle>
          </DrawerHeader>
          {dialogContent}
          <DrawerFooter>
            <DrawerClose asChild>
              <div className="flex flex-col items-center gap-1 sm:flex-row">
                <Button
                  className="w-full flex-auto rounded-full bg-primary text-special sm:order-2"
                  onMouseUp={handleAddStep}
                >
                  Add
                </Button>
                <Button className="w-24 rounded-full bg-transparent text-foreground hover:bg-foreground/5 sm:order-1">
                  Close
                </Button>
              </div>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
};

export default NewStepModal;
