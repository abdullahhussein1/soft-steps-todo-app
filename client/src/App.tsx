import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import ThemeProvider from "@/components/ThemeProvider";
import { DarkModeProvider } from "./context/DarkModeProvider";
import supabase from "./supabase/supabase";
import "./App.css";
import { useEffect, useState } from "react";
import UserType from "./types/UserType";
import { Oval } from "react-loader-spinner";

function App() {
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);

  const systemThemeDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
    }
  };

  useEffect(() => {
    fetchUser().then(() => setLoading(false));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthenticationPage />} />
        <Route
          path="/"
          element={
            loading ? (
              <div
                className={[
                  "flex h-screen w-full items-center justify-center",
                  systemThemeDark ? "bg-black" : "bg-white",
                ].join(" ")}
              >
                <Oval
                  visible={true}
                  height="40"
                  width="40"
                  color={systemThemeDark ? "white" : "black"}
                  strokeWidth={4}
                  secondaryColor={systemThemeDark ? "black" : "dark"}
                  ariaLabel="oval-loading"
                />
              </div>
            ) : (
              <ThemeProvider
                themeColor={user?.user_metadata.color_theme ?? "blue"}
              >
                <DarkModeProvider
                  darkMode={user?.user_metadata.dark_mode ?? "system"}
                >
                  <HomePage user={user} setUser={setUser} />
                </DarkModeProvider>
              </ThemeProvider>
            )
          }
        />
        <Route
          path="*"
          element={
            <div className="flex h-screen flex-col items-center justify-center">
              <h1 className="mb-4 text-4xl font-bold">404 Not Found</h1>
              <p className="mb-8 text-lg">
                Oops! The page you are looking for does not exist.
              </p>
              <Link to="/" className="text-blue-500 hover:underline">
                Go back to the homepage
              </Link>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
