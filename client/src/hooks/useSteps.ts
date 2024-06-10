import { stepsContext } from "@/providers/StepsProvider";
import { useContext } from "react";

export default function useSteps() {
  const context = useContext(stepsContext);

  if (!context) {
    throw new Error("useSteps must be used within a DarkModeProvider");
  }

  return context;
}
