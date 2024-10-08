import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import ThemeProvider from "@/providers/ThemeProvider";
import DarkModeProvider from "./providers/DarkModeProvider";
import "./App.css";
import { Oval } from "react-loader-spinner";
import palestineCountryFilledIcon from "@/assets/images/palestineCountryFilled.png";
import { ArrowLeft } from "lucide-react";
import useUser from "./hooks/useUser";

function App() {
  const { user, isLoading } = useUser();

  const systemThemeDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  if (isLoading) {
    return (
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
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={user ? <Navigate to="/" replace /> : <AuthenticationPage />}
        />
        <Route
          path="/"
          element={
            user ? (
              <ThemeProvider
                themeColor={user?.user_metadata.color_theme ?? "blue"}
              >
                <DarkModeProvider
                  darkMode={user?.user_metadata.dark_mode ?? "system"}
                >
                  <HomePage />
                </DarkModeProvider>
              </ThemeProvider>
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="*"
          element={
            <div
              className={[
                "flex h-screen",
                systemThemeDark ? "bg-black text-white" : "bg-white text-black",
              ].join(" ")}
            >
              <div className="relative mx-auto flex w-full max-w-xl flex-col items-center justify-center p-10">
                <h1 className="mb-4 text-4xl font-semibold">
                  404 <span className="font-light">|</span> Not Found
                </h1>
                <p className="mb-8 text-sm font-light">
                  Oops! The page you are looking for does not exist.
                </p>
                <Link
                  to="/"
                  replace
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
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
