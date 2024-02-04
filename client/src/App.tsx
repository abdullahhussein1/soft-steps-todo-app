import "./App.css";

import TodoApp from "./components/TodoApp";
import ThemeProvider from "@/components/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="blue" storageKey="vite-ui-theme">
      <TodoApp />
    </ThemeProvider>
  );
}

export default App;
