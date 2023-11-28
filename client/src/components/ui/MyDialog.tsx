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

type Props = {
  title: string;
  method: string;
};

const MyDialog = ({ title, method }: Props) => {
  const [todoInput, setTodoInput] = useState("");

  const [date, setDate] = React.useState<Date>();

  return (
    <Dialog>
      {title.toLowerCase() == "add" ? (
        <DialogTrigger className="w-fit px-4 text-sm text-white rounded-full bg-blue-700 hover:bg-blue-800 h-9">
          Add Todo
        </DialogTrigger>
      ) : (
        <DialogTrigger className="flex text-slate-600 hover:text-slate-900 cursor-pointer items-center p-2 gap-2 hover:bg-slate-50 rounded-lg">
          <PencilIcon size={16} />
          <p>Edit</p>
        </DialogTrigger>
      )}
      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>{title} Todo</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-3 mt-8">
          <Input
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            placeholder={`${title} todo`}
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
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="rounded-xl bg-blue-700 hover:bg-blue-800"
              onMouseUp={async (e) => {
                e.preventDefault();
                setTodoInput("");
                if (method.toLowerCase() == "post") {
                  await axios.post("http://localhost:5000/todos", {
                    description: todoInput,
                  });
                } else if (method.toLowerCase() == "put") {
                  await axios.put("http://localhost:5000/todos", {
                    description: todoInput,
                  });
                }
              }}
            >
              {title}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;
