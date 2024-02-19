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
} from "@/components/ui/select";

import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import * as React from "react";
import { format, formatDistanceToNow } from "date-fns";
import { ArrowUpIcon, Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import TodoType from "@/types/TodoType";

type Props = {
  todo: TodoType;
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditTodoDialog = ({
  todo,
  todos,
  setTodos,
  isOpen,
  setIsOpen,
}: Props) => {
  const [todoInput, setTodoInput] = useState(todo.task);
  const [todoNoteInput, setTodoNoteInput] = useState(todo.note);
  const [date, setDate] = React.useState<Date | undefined>(
    todo.remind_at ? new Date(todo.remind_at) : undefined
  );
  const [priority, setPriority] = useState<TodoType["priority"]>(todo.priority);
  const [location, setLocation] = useState<TodoType["location"] | undefined>(
    todo.location
  );
  const [attachment, setAttachment] = useState<
    TodoType["attachment"] | undefined
  >(todo.attachment);

  const isDesktop = useMediaQuery("(min-width: 640px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:rounded-3xl">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-8">
            <label htmlFor="title" className="font-bold">
              title
            </label>
            <Input
              type="text"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              className="rounded-xl border-[0.7px]"
              id="title"
            />
            <label htmlFor="note" className="font-bold">
              note
            </label>
            <Textarea
              value={todoNoteInput ?? ""}
              onChange={(e) => setTodoNoteInput(e.target.value)}
              className="rounded-xl resize-none border-[0.7px] "
              id="note"
            />

            {todo.updated_at && (
              <p className=" text-foreground/70 font-light text-[13px]">
                {"edited " +
                  formatDistanceToNow(new Date(todo.updated_at), {
                    addSuffix: true,
                  })}
              </p>
            )}
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
            <label htmlFor="priority" className="font-bold">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as TodoType["priority"])
              }
              className="rounded-xl border-[0.7px]"
              id="priority"
            >
              <option value="none">None</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <label htmlFor="location" className="font-bold">
              Location
            </label>
            <Input
              type="text"
              value={location || ""}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-xl border-[0.7px]"
              id="location"
            />

            <label htmlFor="attachment" className="font-bold">
              Attachment
            </label>
            <Input
              type="text"
              value={attachment || ""}
              onChange={(e) => setAttachment(e.target.value)}
              className="rounded-xl border-[0.7px]"
              id="attachment"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <div className="flex flex-col gap-1 items-center sm:flex-row">
                <Button
                  className="rounded-full bg-primary text-special sm:order-2 flex-auto w-full "
                  onMouseUp={(e) => {
                    e.preventDefault();
                    axios.put(
                      `${import.meta.env.VITE_API_BASE_URL}/api/todos/${
                        todo.id
                      }`,
                      {
                        task: todoInput,
                        note: todoNoteInput,
                        remind_at:
                          date && date !== todo.remind_at
                            ? new Date(date)
                            : null,
                        priority,
                        location,
                        attachment,
                        updated_at:
                          date !== todo.remind_at ||
                          todoInput !== todo.task ||
                          todoNoteInput !== todo.note ||
                          priority !== todo.priority ||
                          location !== todo.location ||
                          attachment !== todo.attachment
                            ? new Date()
                            : null,
                      }
                    );
                    const mappedTodos = todos.map((tdo) => {
                      if (tdo.id === todo.id && date) {
                        return {
                          ...tdo,
                          task: todoInput,
                          note: todoNoteInput,
                          remind_at: date,
                        };
                      } else if (tdo.id === todo.id) {
                        return {
                          ...tdo,
                          task: todoInput,
                          note: todoNoteInput,
                          priority: priority, // Use the existing priority if not updated
                          location: location, // Use the existing location if not updated
                          attachment: attachment,
                        };
                      }
                      return tdo;
                    });
                    setTodos(mappedTodos);
                  }}
                >
                  Edit
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
            <DrawerTitle>Edit Todo</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-3 mt-3">
            <label htmlFor="title" className="font-bold">
              Title
            </label>
            <Input
              type="text"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              className="rounded-xl border-[0.7px]"
              id="title"
            />
            <Textarea
              value={todoNoteInput ?? ""}
              placeholder="Add note"
              onChange={(e) => setTodoNoteInput(e.target.value)}
              className="rounded-xl text-xs text-foreground/60 resize-none border-[0.7px] "
              id="note"
            />

            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <p className="font-bold">Due to</p>
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
                <p className="font-bold">Priority</p>
                <Select
                  defaultValue="dateEdited"
                  onValueChange={(value) =>
                    setPriority(value as TodoType["priority"])
                  }
                >
                  <SelectTrigger
                    className={cn(
                      "flex items-center text-sm w-fit p-2 border-none rounded-xl justify-start text-left font-normal",
                      todo.priority === "none" && "text-muted-foreground"
                    )}
                  >
                    <ArrowUpIcon className="mr-2 h-4 w-4" />
                    {todo.priority === "none" ? (
                      <p>Set Priority</p>
                    ) : (
                      <p>{priority}</p>
                    )}
                  </SelectTrigger>
                  <SelectContent className="flex flex-col w-fit rounded-xl text-foreground/80">
                    <SelectGroup>
                      <SelectItem value="high">high</SelectItem>
                      <SelectItem value="medium">medium</SelectItem>
                      <SelectItem value="low">low</SelectItem>
                      <SelectItem value="none">none</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <label htmlFor="location" className="font-bold">
              Location
            </label>
            <Input
              type="text"
              value={location || ""}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-xl border-[0.7px]"
              id="location"
            />

            <label htmlFor="attachment" className="font-bold">
              Attachment
            </label>
            <Input
              type="text"
              value={attachment || ""}
              onChange={(e) => setAttachment(e.target.value)}
              className="rounded-xl border-[0.7px]"
              id="attachment"
            />
            {todo.updated_at && (
              <p className=" text-foreground/70 font-light text-xs">
                {"edited " +
                  formatDistanceToNow(new Date(todo.updated_at), {
                    addSuffix: true,
                  })}
              </p>
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <div className="flex flex-col gap-1 items-center sm:flex-row">
                <Button
                  className="rounded-full bg-primary text-special sm:order-2 flex-auto w-full "
                  onMouseUp={(e) => {
                    e.preventDefault();
                    axios.put(
                      `${import.meta.env.VITE_API_BASE_URL}/api/todos/${
                        todo.id
                      }`,
                      {
                        task: todoInput,
                        note: todoNoteInput,
                        remind_at:
                          date && date !== todo.remind_at
                            ? new Date(date)
                            : null,
                        priority,
                        location,
                        attachment,
                        updated_at:
                          date !== todo.remind_at ||
                          todoInput !== todo.task ||
                          todoNoteInput !== todo.note ||
                          priority !== todo.priority ||
                          location !== todo.location ||
                          attachment !== todo.attachment
                            ? new Date()
                            : null,
                      }
                    );
                    const mappedTodos = todos.map((tdo) => {
                      if (tdo.id === todo.id && date) {
                        return {
                          ...tdo,
                          task: todoInput,
                          note: todoNoteInput,
                          remind_at: date,
                        };
                      } else if (tdo.id === todo.id) {
                        return {
                          ...tdo,
                          task: todoInput,
                          note: todoNoteInput,
                          priority: priority, // Use the existing priority if not updated
                          location: location, // Use the existing location if not updated
                          attachment: attachment,
                        };
                      }
                      return tdo;
                    });
                    setTodos(mappedTodos);
                  }}
                >
                  Edit
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

export default EditTodoDialog;
