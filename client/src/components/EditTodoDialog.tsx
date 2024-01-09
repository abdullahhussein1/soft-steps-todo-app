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
import { format, formatDistanceToNow } from "date-fns";
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
  const [todoInput, setTodoInput] = useState(todo.title);
  const [todoNoteInput, setTodoNoteInput] = useState(todo.note);
  const [date, setDate] = React.useState<Date | undefined>(
    todo.remind_date ? new Date(todo.remind_date) : undefined
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="rounded-3xl sm:rounded-3xl">
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

          {todo.updated_at !== todo.created_at && (
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
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <div className="flex flex-col gap-1 items-center sm:flex-row">
              <Button
                className="rounded-full bg-primary text-foreground sm:order-2 flex-auto w-full "
                onMouseUp={async (e) => {
                  e.preventDefault();
                  await axios.put(
                    `https://todo-app-avvn.onrender.com/todos/${todo.id}`,
                    {
                      title: todoInput,
                      note: todoNoteInput,
                      remind_date:
                        date && date != todo.remind_date
                          ? new Date(date).toLocaleDateString()
                          : null,
                      updated_at:
                        date != todo.remind_date ||
                        todoInput != todo.title ||
                        todoNoteInput != todo.note
                          ? new Date()
                          : null,
                    }
                  );
                  const mappedTodos = todos.map((tdo) => {
                    if (tdo.id == todo.id && date) {
                      return {
                        ...tdo,
                        title: todoInput,
                        note: todoNoteInput,
                        remind_date: date,
                      };
                    } else if (tdo.id == todo.id) {
                      return {
                        ...tdo,
                        title: todoInput,
                        note: todoNoteInput,
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
};

export default EditTodoDialog;
