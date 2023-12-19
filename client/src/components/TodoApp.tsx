import { useEffect, useState } from "react";

import axios from "axios";

import TodoList from "./TodoList";

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

const TodoApp = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(true);

  const fetchTodos = async () => {
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
    fetchTodos();
  }, []);

  return (
    <div className="h-screen flex bg-slate-100 justify-center items-center">
      <div className="container bg-white w-5/6 rounded-3xl h-[600px] max-w-md flex flex-col py-3">
        <TodoList
          todos={todos}
          setTodos={setTodos}
          isLoaderVisible={isLoaderVisible}
        />
      </div>
    </div>
  );
};

export default TodoApp;
