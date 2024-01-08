import DarkModeToggle from "./DarkModeToggle";
import ThemesToggle from "./ThemesToggle";
import TodoList from "./TodoList";

const TodoApp = () => {
  return (
    <div className="h-[100dvh] flex flex-col bg-secondary justify-center items-center">
      <div className="w-full max-w-xl gap-2 flex flex-col p-5">
        <div className="flex justify-between">
          <ThemesToggle />
          <DarkModeToggle />
        </div>
        <div className="container bg-background shadow-2xl shadow-gray-950/20 rounded-[30px] h-[590px] max-w-xl flex flex-col p-5">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
