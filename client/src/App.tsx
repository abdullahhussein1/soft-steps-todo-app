import "./App.css";

import TodoApp from "./components/TodoApp";
import ThemeProvider from "@/components/ThemeProvider";

function App() {
  console.log(import.meta.env.VITE_API_BASE_URL);
  return (
    <ThemeProvider defaultTheme="blue" storageKey="vite-ui-theme">
      <TodoApp />
    </ThemeProvider>
  );
}

export default App;
