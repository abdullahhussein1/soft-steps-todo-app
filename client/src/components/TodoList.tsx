import { Oval } from "react-loader-spinner";
import Todo from "./Todo";

type TodoType = {
  todo_id: number;
  description: string;
  pinned: boolean;
  completed: boolean;
};

type Props = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  isLoaderVisible: boolean;
};

const TodoList = ({ todos, setTodos, isLoaderVisible }: Props) => {
  return (
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
        .filter((todo) => todo.pinned)
        .map((todo) => (
          <Todo
            key={todo.todo_id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      {todos
        .filter((todo) => !todo.pinned)
        .map((todo) => (
          <Todo
            key={todo.todo_id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
    </div>
  );
};

export default TodoList;
