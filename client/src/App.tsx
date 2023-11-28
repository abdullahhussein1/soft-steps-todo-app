import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

import { MoreHorizontalIcon } from "lucide-react";
import { TrashIcon } from "lucide-react";
import { Star } from "lucide-react";
import { Oval } from "react-loader-spinner";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MyDialog from "./components/ui/myDialog";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  const pinnedTodos = todos.filter((todo) => todo.pinned == true);
  const unPinnedTodos = todos.filter((todo) => todo.pinned != true);

  const fetchData = async () => {
    const result = await axios
      .get("http://localhost:5000/todos")
      .then((response) => response.data)
      .then((result) => {
        setIsLoaderVisible(false);
        return result;
      });
    setTodos(result);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="container w-5/6  rounded-3xl min-h-[600px] p-10 max-w-md flex flex-col gap-5 ">
        {/* add todo dialog */}
        <MyDialog title="Add" method="post" />
        <div className="flex flex-col gap-3 bg-white flex-1 rounded-2xl">
          <h1 className="font-bold text-lg border-b-[2px] ">todos</h1>
          <Oval
            height={30}
            width={30}
            visible={isLoaderVisible}
            color="blue"
            wrapperClass="flex items-center justify-center mt-20"
            ariaLabel="oval-loading"
            secondaryColor="gray"
            strokeWidth={5}
            strokeWidthSecondary={5}
          />
          {pinnedTodos.map(
            (todo: {
              todo_id: number;
              description: string;
              pinned: boolean;
            }) => (
              <div
                key={todo.todo_id}
                className="border-[0.2px] p-3 rounded-xl flex items-start justify-between"
              >
                <div className="flex gap-2">
                  <input
                    className="accent-black self-start mt-[5.5px]"
                    type="checkbox"
                    name="todo"
                    id={String(todo.todo_id)}
                  />
                  <label
                    htmlFor={String(todo.todo_id)}
                    className="p-0 flex  leading-6"
                    key={todo.todo_id}
                  >
                    {todo.description}
                  </label>
                </div>
                <div className="flex gap-1 mt-[5px] self-start">
                  <Star
                    size={15}
                    className={[
                      " transition-colors duration-300",
                      todo.pinned
                        ? "text-yellow-500 fill-yellow-500  hover:text-yellow-600 hover:fill-yellow-600"
                        : "text-slate-500  hover:text-slate-900",
                    ].join(" ")}
                    onClick={async () => {
                      await axios.put(
                        `http://localhost:5000/todos/${todo.todo_id}`,
                        {
                          description: todo.description,
                          pinned: !todo.pinned,
                        }
                      );
                    }}
                  />
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontalIcon
                        size={16}
                        className=" text-slate-500 hover:text-slate-900 transition-colors duration-300 "
                      />
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col  w-fit p-2 rounded-xl">
                      <MyDialog title="Edit" method="put" />
                      <div
                        onClick={async () => {
                          await axios.delete(
                            `http://localhost:5000/todos/${todo.todo_id}`
                          );
                        }}
                        className="flex text-slate-600 hover:text-slate-900 cursor-pointer items-center justify-start p-2 gap-2 hover:bg-slate-50 rounded-lg"
                      >
                        <TrashIcon size={16} />
                        <p>Delete</p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )
          )}
          {unPinnedTodos.map(
            (todo: {
              todo_id: number;
              description: string;
              pinned: boolean;
            }) => (
              <div
                key={todo.todo_id}
                className="border-[0.2px] p-3 rounded-xl flex items-start justify-between"
              >
                <div className="flex gap-2">
                  <input
                    className="accent-black self-start mt-[5.5px]"
                    type="checkbox"
                    name="todo"
                    id={String(todo.todo_id)}
                  />
                  <label
                    htmlFor={String(todo.todo_id)}
                    className="p-0 flex  leading-6"
                    key={todo.todo_id}
                  >
                    {todo.description}
                  </label>
                </div>
                <div className="flex gap-1 mt-[5px] self-start">
                  <Star
                    size={15}
                    className={[
                      " transition-colors duration-300",
                      todo.pinned
                        ? "text-yellow-500 fill-yellow-500  hover:text-yellow-600 hover:fill-yellow-600"
                        : "text-slate-500  hover:text-slate-900",
                    ].join(" ")}
                    onClick={async () => {
                      await axios.put(
                        `http://localhost:5000/todos/${todo.todo_id}`,
                        {
                          description: todo.description,
                          pinned: !todo.pinned,
                        }
                      );
                    }}
                  />
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontalIcon
                        size={16}
                        className=" text-slate-500 hover:text-slate-900 transition-colors duration-300 "
                      />
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col  w-fit p-2 rounded-xl">
                      <MyDialog title="Edit" method="put" />
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
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
