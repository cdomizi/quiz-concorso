import { useEffect, useReducer } from "react";
import { useQuizCache } from "./useQuizCache";

export type TQuestion = {
  index: number;
  question: string;
  options: string[];
  answer: string;
  selectedAnswer?: string;
};

export type TQuiz = {
  filePath?: string;
  title?: string;
  questions?: TQuestion[];
  step?: number;
};

export type TQuizAction = {
  type: keyof typeof QUIZ_ACTIONS;
  payload: unknown;
};

const initialState: TQuiz = {
  filePath: undefined,
  step: 0,
};

export const QUIZ_ACTIONS = {
  setFilePath: "setFilePath",
  setTitle: "setTitle",
  setQuestions: "setQuestions",
  setStep: "setStep",
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
    case QUIZ_ACTIONS.setQuestions: {
      return {
        ...state,
        questions: action.payload as TQuestion[],
      };
    }
    case QUIZ_ACTIONS.setStep: {
      const defaultStep = 0;
      const newStep = action.payload || defaultStep;

      return {
        ...state,
        step: newStep as number,
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
