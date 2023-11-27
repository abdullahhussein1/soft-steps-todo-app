import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { MoreHorizontalIcon } from "lucide-react";
import { TrashIcon } from "lucide-react";
import { PencilIcon } from "lucide-react";

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

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [data, setData] = useState([]);
  const [date, setDate] = React.useState<Date>();

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/todos");
    const result = await response.data;

    setData(result);
  };
  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="container w-5/6  rounded-3xl min-h-[600px] p-10 max-w-md flex flex-col gap-5 ">
        <Dialog>
          <DialogTrigger className="w-fit px-4 text-sm text-white rounded-full bg-blue-700 hover:bg-blue-800 h-9">
            Add Todo
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle>Add Todo</DialogTitle>
            </DialogHeader>
            <form className="flex flex-col gap-3 mt-8">
              <Input
                type="text"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                placeholder="Add todo"
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
                    await axios.post("http://localhost:5000/todos", {
                      description: todoInput,
                    });
                  }}
                >
                  Add
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="flex flex-col gap-3 bg-white flex-1 rounded-2xl">
          {data.map((todo: { todo_id: number; description: string }) => (
            <div
              key={todo.todo_id}
              className="border-[0.2px] p-3 rounded-xl flex items-start justify-between"
            >
              <div className="flex gap-2">
                <input
                  className="accent-black self-start mt-[5px]"
                  type="checkbox"
                  name="todo"
                  id={String(todo.todo_id)}
                />
                <label
                  htmlFor={String(todo.todo_id)}
                  className="p-0 flex leading-6"
                  key={todo.todo_id}
                >
                  {todo.description}
                </label>
              </div>
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontalIcon
                    size={16}
                    className="mt-[5px] text-slate-500 hover:text-slate-900 transition-colors duration-300"
                  />
                </PopoverTrigger>
                <PopoverContent className="flex flex-col  w-fit p-2 rounded-xl">
                  <div className="flex text-slate-600 hover:text-slate-900 transition-colors duration-300 cursor-pointer items-center p-2 gap-2 hover:bg-slate-50 rounded-lg">
                    <PencilIcon size={16} />
                    <p>Edit</p>
                  </div>
                  <div
                    onClick={async () => {
                      await axios.delete(
                        `http://localhost:5000/todos/${todo.todo_id}`
                      );
                    }}
                    className="flex text-slate-600 hover:text-slate-900 cursor-pointer items-center p-2 gap-2 hover:bg-slate-50 rounded-lg"
                  >
                    <TrashIcon size={16} />
                    <p>Delete</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
