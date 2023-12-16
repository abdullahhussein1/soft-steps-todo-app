import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import * as React from "react";
import { format, formatDistance } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type TodoType = {
  id: number;
  title: string;
  note: string;
  pinned: boolean;
  completed: boolean;
  remind_date: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

type Props = {
  todo: TodoType;
  todoTitle: string;
  setTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  todoNote: string;
  setTodoNote: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type SelectSingleEventHandler = (value: Date | undefined) => void;

const AddTodoDialog = ({
  todo,
  todoTitle,
  setTodoTitle,
  todoNote,
  setTodoNote,
  isOpen,
  setIsOpen,
}: Props) => {
  const [todoInput, setTodoInput] = useState(todoTitle);
  const [todoNoteInput, setTodoNoteInput] = useState(todoNote);
  const [date, setDate] = React.useState<Date | null>(
    todo.remind_date ? new Date(todo.remind_date) : null
  );

  const handleDateSelect: SelectSingleEventHandler = (selectedDate) => {
    if (selectedDate instanceof Date || selectedDate === undefined) {
      setDate(selectedDate ?? null);
    }
  };

  const convertUtcDateToServerTimezone = (utcDate: Date): Date => {
    const serverTimezone = "Asia/Baghdad"; // Your server timezone
    const serverDate = utcToZonedTime(utcDate, serverTimezone);
    return serverDate;
  };
  console.log(date);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="rounded-3xl">
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
            className="rounded-xl  border-[0.5px] "
            id="title"
          />
          <label htmlFor="title" className="font-bold">
            note
          </label>
          <Textarea
            value={todoNoteInput ?? ""}
            onChange={(e) => setTodoNoteInput(e.target.value)}
            className="rounded-xl resize-none  border-[0.5px] "
            id="title"
          />

          <p className="text-sm text-slate-500 font-light">
            {"updated " +
              formatDistance(
                convertUtcDateToServerTimezone(todo.updated_at),
                new Date(),
                {
                  addSuffix: true,
                }
              )}
          </p>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] border-none rounded-xl justify-start text-left font-normal",
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
                selected={
                  date ? convertUtcDateToServerTimezone(date) : new Date()
                }
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="rounded-xl bg-blue-700 hover:bg-blue-800"
              onMouseUp={async (e) => {
                e.preventDefault();
                await axios.put(`http://localhost:5000/todos/${todo.id}`, {
                  title: todoInput,
                  note: todoNoteInput,
                  remind_date: date,
                  updated_at: new Date(),
                });
                setTodoTitle(todoInput);
                setTodoNote(todoNoteInput);
              }}
            >
              Edit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoDialog;
