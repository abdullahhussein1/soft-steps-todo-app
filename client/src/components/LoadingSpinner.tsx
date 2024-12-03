import { Oval } from "react-loader-spinner";

interface LoadingSpinnerProps {
  isDarkMode: boolean;
}

export function LoadingSpinner({ isDarkMode }: LoadingSpinnerProps) {
  return (
    <div
      className={`flex h-screen w-full items-center justify-center ${isDarkMode ? "bg-black" : "bg-white"}`}
    >
      <Oval
        visible={true}
        height="40"
        width="40"
        color={isDarkMode ? "white" : "black"}
        strokeWidth={4}
        secondaryColor={isDarkMode ? "black" : "dark"}
        ariaLabel="oval-loading"
      />
    </div>
  );
}
