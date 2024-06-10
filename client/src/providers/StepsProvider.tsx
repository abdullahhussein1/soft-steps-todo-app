import useUser from "@/hooks/useUser";
import StepType from "@/types/StepType";
import axios from "axios";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

type StepsContextType = {
  steps: StepType[];
  setSteps: Dispatch<SetStateAction<StepType[]>>;
  loading: boolean;
};

type Props = {
  children: ReactNode;
};

const initialState: StepsContextType = {
  steps: [],
  setSteps: () => null,
  loading: true,
};

// eslint-disable-next-line react-refresh/only-export-components
export const stepsContext = createContext(initialState);

export default function StepsProvider({ children }: Props) {
  const [steps, setSteps] = useState<StepType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useUser();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/steps`,
          {
            params: {
              user_id: user?.id,
            },
          },
        );

        const result = response.data;
        setSteps(result);
      } catch (error) {
        console.error("Error fetching steps:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [user?.id]);

  return (
    <stepsContext.Provider value={{ steps, setSteps, loading }}>
      {children}
    </stepsContext.Provider>
  );
}
