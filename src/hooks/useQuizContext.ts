import { useEffect, useReducer } from "react";
import { useQuizCache } from "./useQuizCache";

export type TQuiz = {
  filePath?: string;
  title?: string;
};

export type TQuizAction = {
  type: keyof typeof QUIZ_ACTIONS;
  payload: unknown;
};

const initialState: TQuiz = {
  filePath: undefined,
};

export const QUIZ_ACTIONS = {
  setFilePath: "setFilePath",
  setTitle: "setTitle",
} as const;

function quizReducer(state: TQuiz, action: TQuizAction) {
  switch (action.type) {
    case QUIZ_ACTIONS.setFilePath: {
      return {
        ...state,
        filePath: action.payload as string,
      };
    }
    case QUIZ_ACTIONS.setTitle: {
      return {
        ...state,
        title: action.payload as string,
      };
    }
    default: {
      return state;
    }
  }
}

export function useQuizContext() {
  // Retrieve cached value for quizState
  const { getQuizState, setQuizState } = useQuizCache();

  const [quizState, dispatch] = useReducer(
    quizReducer,
    initialState,
    getQuizState
  );

  useEffect(() => {
    setQuizState(quizState);
  }, [quizState, setQuizState]);

  return { quizState, dispatch };
}
