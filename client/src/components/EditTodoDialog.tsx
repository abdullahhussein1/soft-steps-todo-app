import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { PencilIcon } from "lucide-react";

import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type TodoType = {
  todo_id: number;
  description: string;
  pinned: boolean;
  completed: boolean;
};

type Props = {
  todo: TodoType;
  todoDescription: string;
  setTodoDescription: React.Dispatch<React.SetStateAction<string>>;
};

const AddTodoDialog = ({
  todo,
  todoDescription,
  setTodoDescription,
}: Props) => {
  const [todoInput, setTodoInput] = useState(todoDescription);

  const [date, setDate] = React.useState<Date>();

  return (
    <Dialog>
      <DialogTrigger
        onMouseUp={() => {
          setTodoInput(todoDescription);
        }}
        className="flex text-slate-600 hover:text-slate-900 cursor-pointer items-center p-2 gap-2 hover:bg-slate-50 rounded-lg"
      >
        <PencilIcon size={16} />
        <p>Edit</p>
      </DialogTrigger>
      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-8">
          <Input
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            className="rounded-xl  border-[0.5px] "
          />
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
                selected={date}
                onSelect={setDate}
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
                setTodoDescription(todoInput);
                await axios.put(`http://localhost:5000/todos/${todo.todo_id}`, {
                  description: todoInput,
                });
                setTodoDescription(todoInput);
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
