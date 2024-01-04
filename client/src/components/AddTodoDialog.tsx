import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

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
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const AddTodoDialog = ({ todos, setTodos }: Props) => {
  const [todoInput, setTodoInput] = useState<string>("");
  const [date, setDate] = React.useState<Date>();

  return (
    <Dialog>
      <DialogTrigger className="w-full px-4 text-sm text-white rounded-full bg-slate-700 hover:bg-slate-800 h-9">
        Add Todo
      </DialogTrigger>
      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-8">
          <Input
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            placeholder={`Add todo`}
            className="rounded-xl border-[0.5px] "
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
              className="rounded-xl bg-primary "
              onMouseUp={async (e) => {
                e.preventDefault();
                setTodoInput("");
                const newTodo = await axios.post(
                  "https://todo-app-avvn.onrender.com/todos",
                  {
                    title: todoInput,
                  }
                );
                setTodos([...todos, newTodo.data]);
              }}
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoDialog;
