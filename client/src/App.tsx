import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import ThemeProvider from "@/components/ThemeProvider";
import { DarkModeProvider } from "./context/DarkModeProvider";
import supabase from "./supabase/supabase";
import "./App.css";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

function App() {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <Oval
          visible={true}
          height="40"
          width="40"
          color="white"
          strokeWidth={4}
          secondaryColor="black"
          ariaLabel="oval-loading"
        />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthenticationPage />} />
        <Route
          path="/"
          element={
            <ThemeProvider user={user}>
              <DarkModeProvider user={user}>
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
