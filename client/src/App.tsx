import "./App.css";

import TodoApp from "./components/TodoApp";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TodoApp />
    </ThemeProvider>
  );
}

export default App;
