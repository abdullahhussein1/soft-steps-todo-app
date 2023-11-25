import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./components/ui/input";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [data, setData] = useState([]);

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
      <form className="flex gap-3">
        <Input
          type="text"
          name="description"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          placeholder="Add todo"
        />
        <Button
          onClick={async (e) => {
            e.preventDefault();
            await axios
              .post("http://localhost:5000/todos", {
                description: todoInput,
              })
              .then(() => setTodoInput(""));
          }}
        >
          Add
        </Button>
      </form>
      <div className="flex flex-col">
        {data.map((todo: { todo_id: number; description: string }) => (
          <p
            key={todo.todo_id}
            onClick={async () => {
              await axios.delete(`http://localhost:5000/todos/${todo.todo_id}`);
            }}
          >
            {todo.description}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
