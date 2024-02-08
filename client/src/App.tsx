import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import ThemeProvider from "@/components/ThemeProvider";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="blue" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthenticationPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
