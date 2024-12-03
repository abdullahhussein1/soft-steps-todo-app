import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import palestineCountryFilledIcon from "@/assets/images/palestineCountryFilled.png";

interface NotFoundProps {
  isDarkMode: boolean;
}

export function NotFound({ isDarkMode }: NotFoundProps) {
  return (
    <div
      className={`flex h-screen flex-col items-center justify-center p-10 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <h1 className="mb-4 text-4xl font-semibold">
        404 <span className="font-light">|</span> Not Found
      </h1>
      <p className="mb-8 text-sm font-light">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className={`z-50 flex w-full items-center justify-center gap-2 rounded-2xl border p-3 backdrop-blur-md transition-colors ${
          isDarkMode
            ? "border-neutral-900 hover:bg-neutral-900/60"
            : "border-neutral-300 hover:bg-neutral-200/50"
        }`}
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
  );
}
