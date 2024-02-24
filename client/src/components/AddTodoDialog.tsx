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

import TodoType from "@/types/TodoType";
import UserType from "@/types/UserType";

type Props = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
};

const AddTodoDialog = ({ todos, setTodos, isOpen, setIsOpen, user }: Props) => {
  const [todoInput, setTodoInput] = useState<string | undefined>();
  const [todoNoteInput, setTodoNoteInput] = useState<string | undefined>();
  const [date, setDate] = React.useState<Date | undefined>();
  const [priority, setPriority] = useState<TodoType["priority"] | undefined>(
    "none"
  );
  const [location, setLocation] = useState<TodoType["location"] | undefined>();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:rounded-3xl">
          <DialogHeader>
            <DialogTitle>Add Todo</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-5 mt-3">
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
                value={todoInput ?? ""}
                placeholder="I want to..."
                onChange={(e) => setTodoInput(e.target.value)}
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
                value={todoNoteInput ?? ""}
                placeholder="Add note"
                onChange={(e) => setTodoNoteInput(e.target.value)}
                className="rounded-xl text-xs text-foreground/60 resize-none border-[0.7px] "
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
                        "w-fit px-3 border-none rounded-xl justify-start text-left font-normal",
                        !date && "text-muted-foreground"
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
                        setDate(selectedDate ?? undefined);
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
                    setPriority(value as TodoType["priority"])
                  }
                >
                  <SelectTrigger
                    className={cn(
                      "flex items-center text-sm w-fit border-none rounded-xl justify-start text-left font-normal"
                    )}
                  >
                    <Button
                      variant={"outline"}
                      className={cn(
                        " px-3 border-none rounded-xl w-32 justify-start text-left font-normal",
                        priority === "none" && "text-muted-foreground"
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
                  <SelectContent className="flex flex-col w-fit rounded-xl text-foreground/80">
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
              <div className="flex flex-col gap-1 items-center sm:flex-row">
                <Button
                  className="rounded-full bg-primary text-special sm:order-2 flex-auto w-full "
                  onMouseUp={async (e) => {
                    e.preventDefault();
                    const response = await axios.post(
                      `${import.meta.env.VITE_API_BASE_URL}/api/todos`,
                      {
                        user_id: user?.id,
                        task: todoInput,
                        note: todoNoteInput,
                        remind_at: date ? new Date(date) : null,
                        priority,
                        location,
                      }
                    );

                    const newTodo = response.data;
                    setTodos([...todos, newTodo]);
                    setTodoInput(undefined);
                    setTodoNoteInput(undefined);
                    setPriority(undefined);
                    setLocation(undefined);
                  }}
                >
                  Add
                </Button>
                <Button className="bg-transparent text-foreground sm:order-1 w-24 hover:bg-foreground/5  rounded-full  ">
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
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="rounded-t-3xl px-4">
          <DrawerHeader>
            <DrawerTitle>Add Todo</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-5 mt-3">
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
                value={todoInput ?? ""}
                placeholder="I want to..."
                onChange={(e) => setTodoInput(e.target.value)}
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
                value={todoNoteInput ?? ""}
                placeholder="Add note"
                onChange={(e) => setTodoNoteInput(e.target.value)}
                className="rounded-xl text-xs text-foreground/60 resize-none border-[0.7px] "
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
                        "w-fit px-3 border-none rounded-xl justify-start text-left font-normal",
                        !date && "text-muted-foreground"
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
                        setDate(selectedDate ?? undefined);
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
                    setPriority(value as TodoType["priority"])
                  }
                >
                  <SelectTrigger
                    className={cn(
                      "flex items-center text-sm w-fit border-none rounded-xl justify-start text-left font-normal"
                    )}
                  >
                    <Button
                      variant={"outline"}
                      className={cn(
                        " px-3 border-none rounded-xl w-32 justify-start text-left font-normal",
                        priority === "none" && "text-muted-foreground"
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
                  <SelectContent className="flex flex-col w-fit rounded-xl text-foreground/80">
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
              <div className="flex flex-col gap-1 items-center sm:flex-row">
                <Button
                  className="rounded-full bg-primary text-special sm:order-2 flex-auto w-full "
                  onMouseUp={async (e) => {
                    e.preventDefault();
                    const response = await axios.post(
                      `${import.meta.env.VITE_API_BASE_URL}/api/todos`,
                      {
                        user_id: user?.id,
                        task: todoInput,
                        note: todoNoteInput,
                        remind_at: date ? new Date(date) : null,
                        priority: priority,
                        location: location,
                      }
                    );

                    const newTodo = response.data;
                    setTodos([...todos, newTodo]);
                    setTodoInput(undefined);
                    setTodoNoteInput(undefined);
                    setPriority(undefined);
                    setLocation(undefined);
                  }}
                >
                  Add
                </Button>
                <Button className="bg-transparent text-foreground sm:order-1 w-24 hover:bg-foreground/5  rounded-full  ">
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

export default AddTodoDialog;
