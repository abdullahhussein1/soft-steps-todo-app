import "./App.css";
import { useEffect, useState } from "react";

import axios from "axios";

import { Oval } from "react-loader-spinner";

import AddDialog from "./components/AddDialog";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  type Todo = {
    todo_id: number;
    description: string;
    pinned: boolean;
  };

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
        <AddDialog todos={todos} setTodos={setTodos} />
        <div className="flex flex-col gap-2 bg-white flex-1 rounded-2xl">
          <h1 className="font-bold text-lg border-b-[2px] mb-2 ">todos</h1>
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
          {todos
            .filter((todo: Todo) => todo.pinned)
            .map((todo: Todo) => (
              <Todo
                key={todo.todo_id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
          {todos
            .filter((todo: Todo) => !todo.pinned)
            .map((todo: Todo) => (
              <Todo
                key={todo.todo_id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
