import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import ThemeProvider from "@/components/ThemeProvider";
import { DarkModeProvider } from "./context/DarkModeProvider";
import supabase from "./supabase/supabase";
import "./App.css";
import { useEffect, useState } from "react";
import ColorThemeType from "./types/ColorThemeType";
import DarkModeStateType from "./types/DarkModeStateType";

function App() {
  const [themeColor, setThemeColor] = useState<ColorThemeType>("blue");
  const [darkMode, setDarkMode] = useState<DarkModeStateType>("system");

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setThemeColor(user?.user_metadata.color_theme);
      setDarkMode(user?.user_metadata.dark_mode);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthenticationPage />} />
        <Route
          path="/"
          element={
            <ThemeProvider themeColor={themeColor}>
              <DarkModeProvider darkMode={darkMode}>
                <HomePage />
              </DarkModeProvider>
            </ThemeProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
