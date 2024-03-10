import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import ThemeProvider from "@/context/ThemeProvider";
import { DarkModeProvider } from "./context/DarkModeProvider";
import supabase from "./supabase/supabase";
import "./App.css";
import { useEffect, useState } from "react";
import UserType from "./types/UserType";
import { Oval } from "react-loader-spinner";
import palestineCountryFilledIcon from "@/assets/images/palestineCountryFilled.png";

import { ArrowLeft } from "lucide-react";

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
            <div
              className={[
                "flex h-screen flex-col items-center justify-center p-10",
                systemThemeDark ? "bg-black text-white" : "bg-white text-black",
              ].join(" ")}
            >
              <h1 className="mb-4 text-4xl font-semibold">
                404 <span className="font-light">|</span> Not Found
              </h1>
              <p className="text-md mb-8 font-light">
                Oops! The page you are looking for does not exist.
              </p>
              <Link
                to="/"
                className={[
                  "z-50 flex w-full items-center justify-center gap-2 rounded-2xl border p-3 backdrop-blur-md transition-colors",
                  systemThemeDark
                    ? "border-neutral-900 hover:bg-neutral-900/60"
                    : "border-neutral-300 hover:bg-neutral-200/50",
                ].join(" ")}
              >
                <ArrowLeft size={17} />
                Go back to the homepage
              </Link>
              <img
                src={palestineCountryFilledIcon}
                alt="palestineCountryFilledIcon"
                className="absolute h-full w-full justify-self-center object-cover opacity-10 brightness-50"
              />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
