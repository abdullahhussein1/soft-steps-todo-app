import TodoList from "./TodoList";

const TodoApp = () => {
  return (
    <div className="h-screen flex bg-slate-100 justify-center items-center">
      <div className="container bg-white w-5/6 rounded-3xl h-[600px] max-w-md flex flex-col py-3">
        <TodoList />
      </div>
    </div>
  );
};

export default TodoApp;
