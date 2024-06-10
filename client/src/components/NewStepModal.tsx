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

import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import * as React from "react";
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

import StepType from "@/types/StepType";
import UserType from "@/types/UserType";
import useSteps from "@/hooks/useSteps";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
};

const NewStepModal = ({ isOpen, setIsOpen, user }: Props) => {
  const { steps, setSteps } = useSteps();
  const [stepInput, setStepInput] = useState<string | null>();
  const [stepNoteInput, setStepNoteInput] = useState<string | null>();
  const [date, setDate] = React.useState<Date | null>(null);
  const [priority, setPriority] = useState<StepType["priority"] | null>("none");
  const [location, setLocation] = useState<StepType["location"] | null>();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  if (isDesktop) {
    return (
      <Dialog
        open={isOpen}
        onOpenChange={(value) => {
          setIsOpen(value);
          setStepInput(null);
          setStepNoteInput(null);
          setPriority("none");
          setDate(null);
          setLocation(null);
        }}
      >
        <DialogContent className="sm:rounded-3xl">
          <DialogHeader>
            <DialogTitle>New Step</DialogTitle>
          </DialogHeader>
          <div className="mt-3 flex flex-col gap-5">
            <div className="flex flex-col gap-[6px]">
              <label
                htmlFor="title"
                className="flex items-center gap-2 font-medium"
              >
                <CheckSquare size={17} />
                <p>Title</p>
              </label>
              <Input
                type="text"
                value={stepInput ?? ""}
                placeholder="I want to..."
                onChange={(e) => setStepInput(e.target.value)}
                className="rounded-xl border-[0.7px]"
                id="title"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label
                htmlFor="note"
                className="flex items-center gap-2 font-medium"
              >
                <PencilLine size={17} />
                <p>Note</p>
              </label>
              <Textarea
                value={stepNoteInput ?? ""}
                placeholder="Add note"
                onChange={(e) => setStepNoteInput(e.target.value)}
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
                value={location || ""}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-xl border-[0.7px]"
                id="location"
              />
            </div>
            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-fit justify-start rounded-xl border-none px-3 text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date ?? new Date()}
                      fromDate={new Date()}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate ?? null);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col">
                <Select
                  defaultValue="none"
                  onValueChange={(value) =>
                    setPriority(value as StepType["priority"])
                  }
                >
                  <SelectTrigger
                    className={cn(
                      "flex w-fit items-center justify-start rounded-xl border-none text-left text-sm font-normal",
                    )}
                  >
                    <Button
                      variant={"outline"}
                      className={cn(
                        " w-32 justify-start rounded-xl border-none px-3 text-left font-normal",
                        priority === "none" && "text-muted-foreground",
                      )}
                    >
                      <ArrowUpWideNarrow className="mr-2 h-4 w-4" />
                      {priority !== "none" ? (
                        <SelectValue />
                      ) : (
                        <span>Set priority</span>
                      )}
                    </Button>
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
          <DialogFooter>
            <DialogClose asChild>
              <div className="flex flex-col items-center gap-1 sm:flex-row">
                <Button
                  className="w-full flex-auto rounded-full bg-primary text-special sm:order-2 "
                  onMouseUp={async (e) => {
                    e.preventDefault();
                    const response = await axios.post(
                      `${import.meta.env.VITE_API_BASE_URL}/api/steps`,
                      {
                        user_id: user?.id,
                        task: stepInput,
                        note: stepNoteInput,
                        remind_at: date ? new Date(date) : null,
                        priority,
                        location,
                      },
                    );

                    const newTodo = response.data;
                    setSteps([...steps, newTodo]);
                    setStepInput(null);
                    setStepNoteInput(null);
                    setPriority(null);
                    setLocation(null);
                  }}
                >
                  Add
                </Button>
                <Button className="w-24 rounded-full bg-transparent text-foreground hover:bg-foreground/5  sm:order-1  ">
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
      <Drawer
        open={isOpen}
        onOpenChange={(value) => {
          setIsOpen(value);
          setStepInput(null);
          setStepNoteInput(null);
          setPriority("none");
          setDate(null);
          setLocation(null);
        }}
      >
        <DrawerContent className="rounded-t-3xl px-4">
          <DrawerHeader>
            <DrawerTitle>New Step</DrawerTitle>
          </DrawerHeader>
          <div className="mt-3 flex flex-col gap-5">
            <div className="flex flex-col gap-[6px]">
              <label
                htmlFor="title"
                className="flex items-center gap-2 font-medium"
              >
                <CheckSquare size={17} />
                <p>Title</p>
              </label>
              <Input
                type="text"
                value={stepInput ?? ""}
                placeholder="I want to..."
                onChange={(e) => setStepInput(e.target.value)}
                className="rounded-xl border-[0.7px]"
                id="title"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label
                htmlFor="note"
                className="flex items-center gap-2 font-medium"
              >
                <PencilLine size={17} />
                <p>Note</p>
              </label>
              <Textarea
                value={stepNoteInput ?? ""}
                placeholder="Add note"
                onChange={(e) => setStepNoteInput(e.target.value)}
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
                value={location || ""}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-xl border-[0.7px]"
                id="location"
              />
            </div>
            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-fit justify-start rounded-xl border-none px-3 text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date ?? new Date()}
                      fromDate={new Date()}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate ?? null);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col">
                <Select
                  defaultValue="none"
                  onValueChange={(value) =>
                    setPriority(value as StepType["priority"])
                  }
                >
                  <SelectTrigger
                    className={cn(
                      "flex w-fit items-center justify-start rounded-xl border-none text-left text-sm font-normal",
                    )}
                  >
                    <Button
                      variant={"outline"}
                      className={cn(
                        "flex w-fit items-center justify-start rounded-xl border-none px-3 text-left text-sm font-normal",
                        priority === "none" && "text-muted-foreground",
                      )}
                    >
                      <ArrowUpWideNarrow className="mr-2 h-4 w-4" />
                      {priority !== "none" ? (
                        priority
                      ) : (
                        <span>Set priority</span>
                      )}
                    </Button>
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
          <DrawerFooter>
            <DrawerClose asChild>
              <div className="flex flex-col items-center gap-1 sm:flex-row">
                <Button
                  className="w-full flex-auto rounded-full bg-primary text-special sm:order-2 "
                  onMouseUp={async (e) => {
                    e.preventDefault();
                    try {
                      const response = await axios.post(
                        `${import.meta.env.VITE_API_BASE_URL}/api/steps`,
                        {
                          user_id: user?.id,
                          task: stepInput,
                          note: stepNoteInput,
                          remind_at: date ? new Date(date) : null,
                          priority: priority,
                          location: location,
                        },
                      );

                      const newTodo = response.data;
                      setSteps([...steps, newTodo]);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Add
                </Button>
                <Button className="w-24 rounded-full bg-transparent text-foreground hover:bg-foreground/5  sm:order-1">
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
