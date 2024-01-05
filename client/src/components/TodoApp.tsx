import TodoList from "./TodoList";
import { ModeToggle } from "./mode-toggle";

const TodoApp = () => {
  return (
    <div className="h-[100dvh] flex flex-col bg-secondary justify-center items-center">
      <div className="w-11/12 max-w-lg gap-2 flex flex-col p-5">
        <div className="self-start">
          <ModeToggle />
        </div>
        <div className="container bg-background shadow-2xl shadow-gray-950/20 rounded-[30px] h-[590px] max-w-md flex flex-col p-5">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
