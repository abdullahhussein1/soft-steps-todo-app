import { useEffect, useState } from "react";

import axios from "axios";

import AddDialog from "./AddDialog";
import TodoList from "./TodoList";

type TodoType = {
  todo_id: number;
  description: string;
  pinned: boolean;
};

const TodoBoard = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

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
        <TodoList
          todos={todos}
          setTodos={setTodos}
          isLoaderVisible={isLoaderVisible}
        />
      </div>
    </div>
  );
};

export default TodoBoard;
