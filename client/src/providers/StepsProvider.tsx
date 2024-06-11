import useUser from "@/hooks/useUser";
import StepType from "@/types/StepType";
import axios from "axios";
import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";

type StepsContextType = {
  steps: StepType[];
  dispatch: Dispatch<Action>;
  loading: boolean;
};

type Props = {
  children: ReactNode;
};

const initialState: StepsContextType = {
  steps: [],
  dispatch: () => null,
  loading: true,
};

// eslint-disable-next-line react-refresh/only-export-components
export const stepsContext = createContext(initialState);

export default function StepsProvider({ children }: Props) {
  const [steps, dispatch] = useReducer(stepsReducer, []);
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
        dispatch({
          type: "setted",
          steps: result,
        });
      } catch (error) {
        console.error("Error fetching steps:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [user?.id]);

  return (
    <stepsContext.Provider value={{ steps, dispatch, loading }}>
      {children}
    </stepsContext.Provider>
  );
}

type Action =
  | { type: "setted"; steps: StepType[] }
  | { type: "added"; step: StepType }
  | { type: "changed"; stepId: number; updatedFields: Partial<StepType> }
  | { type: "deleted"; stepId: number };

function stepsReducer(steps: StepType[], action: Action) {
  switch (action.type) {
    case "setted": {
      return action.steps;
    }
    case "added": {
      return [...steps, action.step];
    }
    case "changed": {
      return steps.map((step: StepType) => {
        if (step.id === action.stepId) {
          return {
            ...step,
            ...action.updatedFields,
          };
        } else {
          return step;
        }
      });
    }
    case "deleted": {
      return steps.filter((step) => step.id !== action.stepId);
    }
  }
}
