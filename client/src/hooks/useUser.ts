import { useContext } from "react";
import { userContext } from "@/context/UserProvider";

export default function useUser() {
  const context = useContext(userContext);

  if (!context) {
    throw new Error("useUser must be used within a DarkModeProvider");
  }

  return context;
}
